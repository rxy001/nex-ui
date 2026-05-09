'use client'

import { nex } from '@nex-ui/styled'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import { useMemo, useRef } from 'react'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { ButtonBaseProps } from './types'

const recipe = defineRecipe({
  base: {
    userSelect: 'none',
    cursor: 'pointer',
  },
})

const style = recipe()

export function ButtonBase(props: ButtonBaseProps) {
  const {
    as,
    children,
    disabled,
    type = 'button',
    tabIndex = 0,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onPointerDown,
    ...remainingProps
  } = props

  const activeRef = useRef(false)

  const { focusVisible, focusProps } = useFocusRing()

  const handleKeyDown = useDisableEvent(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      activeRef.current = false
      onKeyDown?.(event)

      if (event.defaultPrevented) return

      const element = event.currentTarget

      // Avoid treating text inputs as clickable buttons activated via Space or Enter.
      if (isTextField(element)) return
      if (event.target !== event.currentTarget) return
      if (element.isContentEditable) return
      if (event.key !== 'Enter' && event.key !== ' ') return

      if (isNativeClick(event)) return

      if (event.metaKey) return

      if (event.key === 'Enter') {
        element.click()
        event.preventDefault()
      }

      if (event.ctrlKey || event.altKey) return
      if (event.key === ' ') {
        activeRef.current = true
        event.preventDefault()
      }
    },
    props.disabled,
  )

  const handleKeyUp = useDisableEvent(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyUp?.(event)
      if (event.defaultPrevented) return

      if (activeRef.current && event.key === ' ') {
        activeRef.current = false
        event.currentTarget.click()
        event.preventDefault()
      }
    },
    props.disabled,
  )

  const handleClick = useDisableEvent(onClick, disabled)

  const handleMouseDown = useDisableEvent(onMouseDown, disabled)

  const handlePointerDown = useDisableEvent(onPointerDown, disabled)

  const ariaProps = useMemo(() => {
    if (!as || as === 'button') {
      return {
        type,
        disabled,
        tabIndex: disabled ? -1 : tabIndex,
      }
    }
    return {
      role: as === 'a' ? undefined : 'button',
      tabIndex: disabled ? -1 : tabIndex,
      'aria-disabled': disabled || undefined,
    }
  }, [type, as, disabled, tabIndex])

  const [ButtonRoot, getButtonRootProps] = useSlot({
    style,
    ariaProps,
    component: nex.button,
    externalForwardedProps: remainingProps,
    additionalProps: {
      as,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onPointerDown: handlePointerDown,
      ...focusProps,
    },
    dataAttrs: {
      disabled,
      focusVisible: focusVisible || undefined,
    },
  })

  return <ButtonRoot {...getButtonRootProps()}>{children}</ButtonRoot>
}

function useDisableEvent(
  onEvent?: React.EventHandler<React.SyntheticEvent>,
  disabled?: boolean,
) {
  return useEvent((event: React.SyntheticEvent) => {
    if (disabled) {
      event.stopPropagation()
      event.preventDefault()

      return
    }
    onEvent?.(event)
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

function isTextField(
  element: Element,
): element is HTMLInputElement | HTMLTextAreaElement {
  try {
    const isTextInput =
      element instanceof HTMLInputElement && element.selectionStart !== null
    const isTextArea = element.tagName === 'TEXTAREA'
    return isTextInput || isTextArea || false
  } catch (_error) {
    // Safari throws an exception when trying to get `selectionStart` on
    // non-text <input> elements (which, understandably, don't have the text
    // selection API). We catch this via a try/catch block, as opposed to a more
    // explicit check of the element's input types, because of Safari's
    // non-standard behavior. This also means we don't have to worry about the
    // list of input types that support `selectionStart` changing as the HTML
    // spec evolves over time.
    return false
  }
}

ButtonBase.displayName = 'ButtonBase'
