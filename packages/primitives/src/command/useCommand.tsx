'use client'

/**
 * https://w3c.github.io/aria/#command
 */

import { useMemo, useRef } from 'react'
import { isTextField } from '@nex-ui/utils'
import { useEvent, useMergeRefs } from '@nex-ui/hooks'
import { createHook, useTagName, useFocusRing } from '../utils'
import type { HookProps, HTMLElements } from '../utils/types'

export const useCommand = createHook<'div', UseCommandOwnProps, CommandState>(
  function useCommand({
    clickOnEnter = true,
    clickOnSpace = true,
    ...props
  }: UseCommandProps) {
    const activeRef = useRef(false)
    const ref = useRef<HTMLDivElement>(null)
    const mergedRefs = useMergeRefs(ref, props.ref)
    const tagName = useTagName(ref)
    const supportsDisabled = supportsDisabledAttribute(tagName)
    const tabIndex = useTabIndex({
      tagName,
      supportsDisabled,
      disabled: props.disabled,
      tabIndex: props.tabIndex,
    })

    const { onKeyDown } = props
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)

      activeRef.current = false
      if (event.defaultPrevented) return
      if (props.disabled) return

      const element = event.currentTarget

      // Avoid treating text inputs as clickable buttons activated via Space or Enter.
      if (isTextField(element)) return
      if (event.target !== event.currentTarget) return
      if (element.isContentEditable) return

      const shouldClickOnEnter = clickOnEnter && event.key === 'Enter'
      const shouldClickOnSpace = clickOnSpace && event.key === ' '

      if (
        (event.key === 'Enter' && !clickOnEnter) ||
        (event.key === ' ' && !clickOnSpace)
      ) {
        event.preventDefault()
        return
      }

      if (!shouldClickOnEnter && !shouldClickOnSpace) return
      if (isNativeClick(event)) return

      if (event.metaKey) return

      if (shouldClickOnEnter) {
        element.click()
        event.preventDefault()
      }

      if (event.ctrlKey || event.altKey) return
      if (shouldClickOnSpace) {
        activeRef.current = true
        event.preventDefault()
      }
    }

    const { onKeyUp } = props
    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyUp?.(event)

      if (event.defaultPrevented) return
      if (props.disabled) return

      if (activeRef.current && event.key === ' ') {
        activeRef.current = false
        event.currentTarget.click()
        event.preventDefault()
      }
    }

    const handleClickCapture = useDisableEvent(
      props.onClickCapture,
      props.disabled,
    )

    const handleMouseDown = useDisableEvent(props.onMouseDown, props.disabled)

    const handleKeyDownCapture = useDisableEvent(
      props.onKeyDownCapture,
      props.disabled,
    )

    props = {
      'aria-disabled': !supportsDisabled ? props.disabled : undefined,
      ...props,
      tabIndex,
      ref: mergedRefs,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onClickCapture: handleClickCapture,
      onMouseDown: handleMouseDown,
      onKeyDownCapture: handleKeyDownCapture,
    }

    const state: CommandState = {
      disabled: props.disabled,
    }

    ;({ props, focusVisible: state.focusVisible } = useFocusRing(props))

    return {
      props,
      state,
    }
  },
)

function useDisableEvent(
  onEvent?: React.EventHandler<React.SyntheticEvent>,
  disabled?: boolean,
) {
  return useEvent((event: React.SyntheticEvent) => {
    onEvent?.(event)
    if (event.defaultPrevented) return
    if (disabled) {
      event.stopPropagation()
      event.preventDefault()
    }
  })
}

function isNativeClick(event: React.KeyboardEvent) {
  if (!event.isTrusted) return false
  const element = event.currentTarget
  if (event.key === 'Enter') {
    return (
      element.tagName === 'BUTTON' ||
      element.tagName === 'SUMMARY' ||
      element.tagName === 'A'
    )
  }
  if (event.key === ' ') {
    return (
      element.tagName === 'BUTTON' ||
      element.tagName === 'SUMMARY' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'SELECT'
    )
  }
  return false
}

function useTabIndex({
  tagName,
  disabled,
  tabIndex,
  supportsDisabled,
}: {
  tagName?: string
  disabled?: boolean
  tabIndex?: number
  supportsDisabled?: boolean
}) {
  const isNativeTabbable = useMemo(() => {
    if (!tagName) return true
    return (
      tagName === 'button' ||
      tagName === 'summary' ||
      tagName === 'input' ||
      tagName === 'select' ||
      tagName === 'textarea' ||
      tagName === 'a'
    )
  }, [tagName])

  // Elements that support the `disabled` attribute don't need tabIndex.
  if (disabled) return isNativeTabbable && !supportsDisabled ? -1 : undefined
  if (tabIndex !== undefined) return tabIndex
  if (isNativeTabbable) return undefined
  return 0
}

function supportsDisabledAttribute(tagName?: string) {
  if (!tagName) return true
  return (
    tagName === 'button' ||
    tagName === 'input' ||
    tagName === 'select' ||
    tagName === 'textarea' ||
    tagName === 'optgroup' ||
    tagName === 'option' ||
    tagName === 'fieldset'
  )
}

export interface UseCommandOwnProps {
  clickOnEnter?: boolean

  clickOnSpace?: boolean

  disabled?: boolean

  autoFocus?: boolean
}

export interface CommandState {
  focusVisible?: boolean
  disabled?: boolean
}

export type UseCommandProps<Element extends HTMLElements = 'div'> = HookProps<
  Element,
  UseCommandOwnProps
>
