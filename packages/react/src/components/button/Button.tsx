'use client'

import { LoadingOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { ButtonBase } from './ButtonBase'
import { buttonRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  Ripple,
  useStyles,
  useSlot,
} from '../utils'
import type { ElementType } from 'react'
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
    spinnerPlacement,
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
      loading && spinnerPlacement === 'start' && `icon-loading`,
    ],
    endIcon: [
      `icon`,
      `end-icon`,
      `icon-size-${size}`,
      loading && spinnerPlacement === 'end' && `icon-loading`,
    ],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(btnRoot),
    classes,
  )

  return composedClasses
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
    children,
    slotProps,
    spinner,
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

  const disabled = loading || disabledProp

  const ownerState: ButtonOwnerState = {
    ...props,
    variant,
    size,
    radius,
    iconOnly,
    loading,
    fullWidth,
    color,
    disableRipple,
    disabled: disabledProp,
  }

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Button',
    recipe: buttonRecipe,
  })

  const [ButtonRoot, getButtonRootProps] = useSlot({
    ownerState,
    elementType: ButtonBase<'button'>,
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    style: styles.root,
    shouldForwardComponent: false,
    additionalProps: {
      disabled,
    },
  })

  const [ButtonStartIcon, getButtonStartIconProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.startIcon,
    classNames: classes.startIcon,
    style: styles.startIcon,
  })

  const [ButtonEndIcon, getButtonEndIconProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.endIcon,
    classNames: classes.endIcon,
    style: styles.endIcon,
  })

  const loadingIcon = spinner ?? <LoadingOutlined />

  return (
    <Ripple disabled={disableRipple ?? disabled}>
      <ButtonRoot {...getButtonRootProps()}>
        {((spinnerPlacement === 'start' && loading) || startIconProp) && (
          <ButtonStartIcon {...getButtonStartIconProps()}>
            {loading ? loadingIcon : startIconProp}
          </ButtonStartIcon>
        )}
        {children}
        {((spinnerPlacement === 'end' && loading) || endIconProp) && (
          <ButtonEndIcon {...getButtonEndIconProps()}>
            {loading ? loadingIcon : endIconProp}
          </ButtonEndIcon>
        )}
      </ButtonRoot>
    </Ripple>
  )
}

Button.displayName = 'Button'
