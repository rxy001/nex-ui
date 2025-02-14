'use client'

import { LoadingOutlined } from '@nex-ui/icons'
import { useEvent } from '@nex-ui/hooks'
import { nex } from '@nex-ui/styled'
import type { Ref, MouseEvent, ElementType } from 'react'
import { useNexContext } from '../provider'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  useSlotStyles,
  resolveSxProps,
} from '../utils'
import type { ButtonProps, ButtonOwnerState } from './types'

const useSlotClasses = <RootComponent extends ElementType = 'button'>(
  ownerState: ButtonOwnerState<RootComponent>,
) => {
  const { prefix } = useNexContext()

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

export const Button = forwardRef(
  <RootComponent extends ElementType = 'button'>(
    inProps: ButtonProps<RootComponent>,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const { primaryColor } = useNexContext()

    const props = useDefaultProps<ButtonProps>({
      name: 'Button',
      props: inProps,
    })

    const {
      as,
      sx,
      children,
      slotProps,
      className,
      spinner,
      href,
      color = primaryColor,
      spinnerPlacement = 'start',
      variant = 'filled',
      size = 'md',
      radius = size,
      iconOnly = false,
      loading = false,
      disabled = false,
      fullWidth = false,
      startIcon: startIconProp,
      endIcon: endIconProp,
      onClick: onClickProp,
      ...remainingProps
    } = props

    const rootElement: ElementType =
      as !== undefined ? as : typeof href === 'string' && href ? 'a' : 'button'

    const ownerState = {
      ...props,
      variant,
      size,
      radius,
      iconOnly,
      loading,
      disabled,
      fullWidth,
      color,
    }

    const classes = useSlotClasses(ownerState)

    const styles = useSlotStyles({
      ownerState,
      name: 'Button',
    })

    const onClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }
      onClickProp?.(event)
    })

    const rootProps = useSlotProps({
      externalSlotProps: remainingProps,
      externalForwardedProps: {
        ref,
        onClick,
        className,
        href: rootElement === 'a' ? href : null,
        as: rootElement,
        [rootElement === 'button' ? 'disabled' : 'data-disabled']:
          disabled || loading,
      },
      classNames: classes.root,
      sx: [styles.root, resolveSxProps(sx, ownerState)],
    })

    const startIconProps = useSlotProps({
      externalSlotProps: slotProps?.startIcon,
      classNames: classes.startIcon,
      sx: styles.startIcon,
    })

    const endIconProps = useSlotProps({
      externalSlotProps: slotProps?.endIcon,
      classNames: classes.endIcon,
      sx: styles.endIcon,
    })

    const startIcon = ((spinnerPlacement === 'start' && loading) ||
      startIconProp) && (
      <nex.span {...startIconProps}>
        {loading ? (spinner ?? <LoadingOutlined />) : startIconProp}
      </nex.span>
    )

    const endIcon = ((spinnerPlacement === 'end' && loading) ||
      endIconProp) && (
      <nex.span {...endIconProps}>
        {loading ? (spinner ?? <LoadingOutlined />) : endIconProp}
      </nex.span>
    )

    return (
      <nex.button {...rootProps}>
        {startIcon}
        {children}
        {endIcon}
      </nex.button>
    )
  },
)

Button.displayName = 'Button'
