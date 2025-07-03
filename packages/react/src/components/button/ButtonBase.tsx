'use client'

import { nex } from '@nex-ui/styled'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { isFunction, mergeProps } from '@nex-ui/utils'
import type { ComponentProps, ElementType, KeyboardEvent } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { Overwrite } from '../../types/utils'

type ButtonBaseProps<RootComponent extends ElementType = 'button'> = Overwrite<
  ComponentProps<RootComponent>,
  {
    as?: RootComponent
    sx?: Interpolation
    href?: string
  }
>

export const ButtonBase = <RootComponent extends ElementType = 'button'>(
  inProps: ButtonBaseProps<RootComponent>,
) => {
  const props = inProps as ButtonBaseProps<'button'>
  const {
    as,
    role,
    children,
    disabled,
    type = 'button',
    tabIndex = 0,
    ...remainingProps
  } = props

  const rootElement =
    as !== undefined
      ? as
      : typeof props.href === 'string' && props.href
        ? 'a'
        : 'button'

  const { focusVisible, focusProps } = useFocusRing()

  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    // Limit the repeated triggering of the click event when the Enter key is pressed.
    if (
      focusVisible &&
      event.code === 'Enter' &&
      event.target === event.currentTarget &&
      (event.currentTarget.tagName === 'BUTTON' ||
        event.currentTarget.tagName === 'A')
    ) {
      event.preventDefault()
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      event.target === event.currentTarget &&
      (event.code === 'Space' || event.code === 'Enter')
    ) {
      event.currentTarget.click()
    }
  })

  const ariaProps = useMemo(() => {
    if (rootElement !== 'button' && !isFunction(rootElement)) {
      return {
        tabIndex: disabled ? -1 : tabIndex,
        role: role ?? 'button',
        'aria-disabled': props['aria-disabled'] ?? (disabled || undefined),
      }
    }
    return {
      tabIndex: disabled ? -1 : tabIndex,
      type,
      disabled,
      role,
    }
  }, [disabled, props, role, rootElement, tabIndex, type])

  const mergedProps = useMemo(() => {
    return mergeProps(remainingProps, focusProps, ariaProps)
  }, [ariaProps, focusProps, remainingProps])

  return (
    <nex.button
      as={rootElement}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      {...mergedProps}
    >
      {children}
    </nex.button>
  )
}

ButtonBase.displayName = 'ButtonBase'
