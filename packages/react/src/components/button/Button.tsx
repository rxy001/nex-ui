'use client'

import { LoadingOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { ButtonBase } from '../buttonBase'
import { buttonRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  Ripple,
  useStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import type { ElementType } from 'react'
import type { ButtonProps } from './types'

const slots = ['root', 'startIcon', 'endIcon']

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
    classNames,
    color = primaryThemeColor,
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
    spinnerPlacement = 'start',
    ...remainingProps
  } = props

  const disabled = loading || disabledProp

  const ownerState: ButtonProps = {
    ...props,
    spinnerPlacement,
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

  const slotClasses = useSlotClasses({
    name: 'Button',
    slots,
    classNames,
  })

  const styles = useStyles({
    ownerState,
    name: 'Button',
    recipe: buttonRecipe,
  })

  const [ButtonRoot, getButtonRootProps] = useSlot({
    elementType: ButtonBase<'button'>,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    style: styles.root,
    shouldForwardComponent: false,
    additionalProps: {
      disabled,
    },
    dataAttrs: {
      variant,
      radius,
      size,
      color,
      iconOnly,
      loading,
      disabled,
      fullWidth,
      disableRipple,
    },
  })

  const [ButtonStartIcon, getButtonStartIconProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.startIcon,
    classNames: slotClasses.startIcon,
    style: styles.startIcon,
  })

  const [ButtonEndIcon, getButtonEndIconProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.endIcon,
    classNames: slotClasses.endIcon,
    style: styles.endIcon,
  })

  const loadingIcon = spinner ?? <LoadingOutlined />

  return (
    <Ripple disabled={disableRipple || disabled}>
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
