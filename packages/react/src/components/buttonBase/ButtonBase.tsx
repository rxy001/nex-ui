'use client'

import { nex } from '@nex-ui/styled'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { isFunction } from '@nex-ui/utils'
import { useSlotProps } from '../utils'
import type { ElementType, KeyboardEvent, MouseEvent } from 'react'
import type { ButtonBaseProps } from './types'

const useAriaProps = (props: ButtonBaseProps<'a' | 'button'>) => {
  const {
    as,
    disabled,
    role,
    href,
    type,
    'aria-disabled': ariaDisabled,
    tabIndex,
  } = props

  return useMemo(() => {
    if (isFunction(as)) {
      return {}
    }

    if (as !== 'button') {
      return {
        role: role ?? (as === 'a' && href ? undefined : 'button'),
        tabIndex: disabled ? -1 : tabIndex,
        'aria-disabled': ariaDisabled ?? (disabled || undefined),
        // aria-label is not set by default, because the accessible name
        // is computed from any text content inside the button element
      }
    }
    return {
      type,
      disabled,
      tabIndex: disabled ? -1 : tabIndex,
    }
  }, [as, type, disabled, tabIndex, role, href, ariaDisabled])
}

export const ButtonBase = <RootComponent extends ElementType = 'button'>(
  inProps: ButtonBaseProps<RootComponent>,
) => {
  const props = inProps as ButtonBaseProps<'button'>
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

  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    // Limit the repeated triggering of the click event when the Enter key is pressed.
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (
      focusVisible &&
      event.target === event.currentTarget &&
      (event.key === ' ' || event.key === 'Enter') &&
      (event.currentTarget.tagName === 'BUTTON' ||
        event.currentTarget.tagName === 'A')
    ) {
      event.preventDefault()
    }

    onKeyDown?.(event)
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (
      focusVisible &&
      event.target === event.currentTarget &&
      (event.key === ' ' || event.key === 'Enter')
    ) {
      event.currentTarget.click()
    }

    onKeyUp?.(event)
  })

  const handleClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    onClick?.(event)
  })

  const ariaProps = useAriaProps({
    ...props,
    type,
    tabIndex,
    as: rootElement,
  })

  const rootProps = useSlotProps({
    a11y: {
      ...ariaProps,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
    },
    externalForwardedProps: remainingProps,
    additionalProps: {
      as: rootElement,
      'data-focus-visible': focusVisible || undefined,
      ...focusProps,
    },
  })

  return <nex.button {...rootProps}>{children}</nex.button>
}

ButtonBase.displayName = 'ButtonBase'
