'use client'

import { LoadingOutlined } from '@nex-ui/icons'
import { useEvent, useFocusVisible } from '@nex-ui/hooks'
import { nex } from '@nex-ui/styled'
import { useRef } from 'react'
import type {
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
} from 'react'
import { mergeRefs } from '@nex-ui/utils'
import { useNexUI } from '../provider'
import { buttonRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  useSlotProps,
  Ripple,
  useStyles,
} from '../utils'
import type { ButtonProps, ButtonOwnerState } from './types'

const useSlotClasses = (ownerState: ButtonOwnerState) => {
  const { prefix } = useNexUI()

  const btnRoot = `${prefix}-btn`

  const {
    color,
    variant,
    radius,
    size,
    iconOnly,
    loading,
    disabled,
    fullWidth,
    classes,
    disableRipple,
  } = ownerState

  const slots = {
    root: [
      'root',
      `variant-${variant}`,
      `radius-${radius}`,
      `size-${size}`,
      `color-${color}`,
      iconOnly && `icon-only`,
      loading && `loading`,
      disabled && `disabled`,
      fullWidth && `full-width`,
      disableRipple && 'disable-ripple',
    ],
    startIcon: [
      `icon`,
      `start-icon`,
      `icon-size-${size}`,
      loading && `icon-loading`,
    ],
    endIcon: [`icon`, `end-icon`, `icon-size-${size}`],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(btnRoot),
    classes,
  )

  return composedClasses
}

const useSlotAriaProps = (
  ownerState: ButtonOwnerState,
): Record<'root', HTMLAttributes<HTMLElement>> => {
  const { as, disabled: disabledProps, role, loading, tabIndex } = ownerState
  const disabled = disabledProps || loading

  let root: ButtonHTMLAttributes<HTMLButtonElement> = {
    tabIndex: disabled ? -1 : tabIndex,
  }

  if (as === 'button') {
    root = {
      ...root,
      disabled,
    }
  } else {
    root = {
      ...root,
      role: role ?? 'button',
      'aria-disabled': disabled || undefined,
    }
  }

  return { root }
}

export const Button = <RootComponent extends ElementType = 'button'>(
  inProps: ButtonProps<RootComponent>,
) => {
  const { primaryThemeColor } = useNexUI()

  const props = useDefaultProps<ButtonProps>({
    name: 'Button',
    props: inProps,
  })

  const {
    as,
    ref,
    children,
    slotProps,
    spinner,
    href,
    type = 'button',
    tabIndex = 0,
    color = primaryThemeColor,
    spinnerPlacement = 'start',
    variant = 'solid',
    size = 'md',
    radius = size,
    iconOnly = false,
    loading = false,
    disabled: disabledProp = false,
    fullWidth = false,
    disableRipple = false,
    startIcon: startIconProp,
    endIcon: endIconProp,
    ...remainingProps
  } = props

  const btnRef = useRef<HTMLButtonElement>(null)

  const mergedRefs = mergeRefs(btnRef, ref)

  const disabled = loading || disabledProp

  const rootElement = (
    as !== undefined ? as : typeof href === 'string' && href ? 'a' : 'button'
  ) as 'button'

  const ownerState: ButtonOwnerState = {
    ...props,
    type,
    tabIndex,
    variant,
    size,
    radius,
    iconOnly,
    loading,
    fullWidth,
    color,
    disableRipple,
    disabled: disabledProp,
    as: rootElement,
  }

  const [focusVisible] = useFocusVisible({ ref: btnRef })

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState: {
      ...ownerState,
      disabled,
    },
    name: 'Button',
    recipe: buttonRecipe,
  })

  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    // Limit the repeated triggering of the click event when the Enter key is pressed.
    if (focusVisible && rootElement === 'button' && event.code === 'Enter') {
      event.preventDefault()
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      as !== 'button' &&
      (event.code === 'Space' || event.code === 'Enter')
    ) {
      event.currentTarget.click()
    }
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const rootProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    sx: styles.root,
    additionalProps: {
      href,
      type,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      ref: mergedRefs,
      as: rootElement,
      ...slotAriaProps.root,
    },
  })

  const startIconProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.startIcon,
    classNames: classes.startIcon,
    sx: styles.startIcon,
  })

  const endIconProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.endIcon,
    classNames: classes.endIcon,
    sx: styles.endIcon,
  })

  const loadingIcon = spinner ?? <LoadingOutlined />

  const startIcon = ((spinnerPlacement === 'start' && loading) ||
    startIconProp) && (
    <nex.span {...startIconProps}>
      {loading ? loadingIcon : startIconProp}
    </nex.span>
  )

  const endIcon = ((spinnerPlacement === 'end' && loading) || endIconProp) && (
    <nex.span {...endIconProps}>{loading ? loadingIcon : endIconProp}</nex.span>
  )

  return (
    <Ripple disabled={disableRipple ?? disabled}>
      <nex.button {...rootProps}>
        {startIcon}
        {children}
        {endIcon}
      </nex.button>
    </Ripple>
  )
}

Button.displayName = 'Button'
