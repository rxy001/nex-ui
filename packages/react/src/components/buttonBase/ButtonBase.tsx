'use client'

import { nex } from '@nex-ui/styled'
import { useFocusRing } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { isFunction } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { KeyboardEvent, MouseEvent } from 'react'
import type { ButtonBaseProps } from './types'

const recipe = defineRecipe({
  base: {
    p: 0,
    m: 0,
    outline: 'none',
    background: 'none',
    border: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
  },
})

const style = recipe()

export const ButtonBase = (props: ButtonBaseProps) => {
  const {
    as,
    children,
    disabled,
    type = 'button',
    tabIndex = 0,
    onClick,
    onKeyDown,
    onKeyUp,
    ...remainingProps
  } = props

  const rootElement = (
    as !== undefined
      ? as
      : typeof props.href === 'string' && props.href
        ? 'a'
        : 'button'
  ) as 'button'

  const { focusVisible, focusProps } = useFocusRing()

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (
      focusVisible &&
      event.target === event.currentTarget &&
      event.currentTarget.tagName !== 'BUTTON'
    ) {
      if (event.key === 'Enter' && event.currentTarget.tagName !== 'A') {
        event.currentTarget.click()
      } else if (event.key === ' ') {
        // Prevent scrolling when space is pressed
        event.preventDefault()
      }
    }

    onKeyDown?.(event)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (
      focusVisible &&
      event.target === event.currentTarget &&
      event.key === ' ' &&
      event.currentTarget.tagName !== 'BUTTON'
    ) {
      event.currentTarget.click()
    }

    onKeyUp?.(event)
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  const ariaProps = useMemo(() => {
    if (isFunction(rootElement)) {
      return {}
    }

    if (rootElement !== 'button') {
      return {
        role: rootElement === 'a' && props.href ? undefined : 'button',
        tabIndex: disabled ? -1 : tabIndex,
        'aria-disabled': disabled || undefined,
        // aria-label is not set by default, because the accessible name
        // is computed from any text content inside the button element
      }
    }
    return {
      type,
      disabled,
      tabIndex: disabled ? -1 : tabIndex,
    }
  }, [rootElement, type, disabled, tabIndex, props.href])

  const [ButtonRoot, getButtonRootProps] = useSlot({
    style,
    component: nex.button,
    externalForwardedProps: remainingProps,
    ariaProps,
    additionalProps: {
      as: rootElement,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      ...focusProps,
    },
    dataAttrs: {
      disabled,
      focusVisible: focusVisible || undefined,
    },
  })

  return <ButtonRoot {...getButtonRootProps()}>{children}</ButtonRoot>
}

ButtonBase.displayName = 'ButtonBase'
