'use client'

import { nex } from '@nex-ui/styled'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { isFunction } from '@nex-ui/utils'
import { useSlotProps } from '../utils'
import { buttonBaseRecipes } from '../../theme/recipes'
import type { ElementType, KeyboardEvent } from 'react'
import type { ButtonBaseProps } from './types'

const style = buttonBaseRecipes()

const useAriaProps = (props: ButtonBaseProps<'a' | 'button'>) => {
  const {
    as,
    disabled,
    'aria-disabled': ariaDisabled,
    role = 'button',
    type = 'button',
    tabIndex = 0,
  } = props

  return useMemo(() => {
    if (as !== 'button' && !isFunction(as)) {
      return {
        role,
        tabIndex: disabled ? -1 : tabIndex,
        'aria-disabled': ariaDisabled ?? (disabled || undefined),
      }
    }
    return {
      type,
      disabled,
      tabIndex: disabled ? -1 : tabIndex,
    }
  }, [as, type, disabled, tabIndex, role, ariaDisabled])
}

export const ButtonBase = <RootComponent extends ElementType = 'button'>(
  inProps: ButtonBaseProps<RootComponent>,
) => {
  const props = inProps as ButtonBaseProps<'button'>
  const { as, children, ...remainingProps } = props

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

  const handleClick = useEvent((event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.disabled) {
      event.preventDefault()
      return
    }
  })

  const ariaProps = useAriaProps({
    ...props,
    as: rootElement,
  })

  const rootProps = useSlotProps({
    style,
    a11y: ariaProps,
    externalForwardedProps: remainingProps,
    additionalProps: {
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
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
