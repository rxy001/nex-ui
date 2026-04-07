'use client'

import { nex } from '@nex-ui/styled'
import { LoadingOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { ButtonBase } from '../buttonBase'
import { buttonRecipe } from '../../themes/recipes'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { Ripple } from '../ripple'
import type { ElementType } from 'react'
import type { ButtonProps } from './types'

const slots = ['root', 'startIcon', 'endIcon'] as const

export function Button<RootComponent extends ElementType = 'button'>(
  inProps: ButtonProps<RootComponent>,
) {
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
    radius = 'md',
    iconOnly = false,
    loading = false,
    disabled: disabledProp = false,
    fullWidth = false,
    disableRipple = false,
    startIcon: startIconProp,
    endIcon: endIconProp,
    spinnerPlacement = 'start',
    disableAnimation = false,
    ...remainingProps
  } = props

  const disabled = loading || disabledProp

  const ownerState: ButtonProps = {
    ...props,
    disableAnimation,
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

  const styles = useRecipeStyles({
    ownerState,
    name: 'Button',
    recipe: buttonRecipe,
  })

  const [ButtonRoot, getButtonRootProps] = useSlot({
    component: ButtonBase,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    style: styles.root,
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
      disableAnimation,
      spinnerPlacement,
    },
  })

  const [ButtonStartIcon, getButtonStartIconProps] = useSlot({
    component: nex.span,
    externalSlotProps: slotProps?.startIcon,
    classNames: slotClasses.startIcon,
    style: styles.startIcon,
  })

  const [ButtonEndIcon, getButtonEndIconProps] = useSlot({
    component: nex.span,
    externalSlotProps: slotProps?.endIcon,
    classNames: slotClasses.endIcon,
    style: styles.endIcon,
  })

  const loadingIcon = spinner ?? <LoadingOutlined />

  const renderChildren = () => {
    if (iconOnly) {
      return loading ? loadingIcon : children
    }

    return (
      <>
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
      </>
    )
  }

  return (
    <Ripple disabled={disableRipple || disableAnimation || disabled}>
      <ButtonRoot {...getButtonRootProps()}>{renderChildren()}</ButtonRoot>
    </Ripple>
  )
}

Button.displayName = 'Button'
