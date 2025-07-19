'use client'

import { nex } from '@nex-ui/styled'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { isFunction } from '@nex-ui/utils'
import { useSlotProps } from '../utils'
import { buttonBaseRecipes } from '../../theme/recipes'
import type { ElementType, KeyboardEvent } from 'react'
import type { ButtonBaseProps } from './types'

const useAriaProps = (props: ButtonBaseProps<'a' | 'button'>) => {
  const {
    as,
    disabled,
    role,
    href,
    type = 'button',
    'aria-disabled': ariaDisabled,
    tabIndex = 0,
  } = props

  return useMemo(() => {
    if (as !== 'button' && !isFunction(as)) {
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
  const { as, children, disabled, ...remainingProps } = props

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
      event.key === 'Enter' &&
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
      (event.key === 'Space' || event.key === 'Enter')
    ) {
      event.currentTarget.click()
    }
  })

  const ariaProps = useAriaProps({
    ...props,
    as: rootElement,
  })

  const style = buttonBaseRecipes({
    disabled,
  })

  const rootProps = useSlotProps({
    style,
    a11y: ariaProps,
    externalForwardedProps: remainingProps,
    additionalProps: {
      disabled,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      'data-focus-visible': focusVisible || undefined,
      ...focusProps,
    },
  })

  return (
    <nex.button as={rootElement} {...rootProps}>
      {children}
    </nex.button>
  )
}

ButtonBase.displayName = 'ButtonBase'
