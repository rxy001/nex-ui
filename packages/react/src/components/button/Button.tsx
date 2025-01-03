'use client'

import { useMemo } from 'react'
import clsx from 'clsx'
import { LoadingOutlined } from '@nex-ui/icons'
import { useEvent } from '@nex-ui/utils'
import { nex, composeSx } from '@nex-ui/styled'
import type { Ref, MouseEvent, ElementType } from 'react'
import { useNexContext } from '../provider'
import {
  useStyles,
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  forwardRef,
} from '../utils'
import type { ButtonProps, ButtonOwnerState } from './types'

const useUtilityClasses = <T extends ElementType>(
  ownerState: ButtonOwnerState<T>,
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
    ownerState,
    classes,
  )

  return composedClasses
}

export const Button = forwardRef(
  <RootComponent extends ElementType = 'button'>(
    inProps: ButtonProps<RootComponent>,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const props = useDefaultProps({
      name: 'Button',
      props: inProps,
    })

    const {
      as,
      sx,
      className,
      children,
      slotProps,
      variant = 'filled',
      size = 'md',
      radius = size,
      iconOnly = false,
      loading = false,
      disabled = false,
      fullWidth = false,
      color = 'blue',
      startIcon: startIconProp,
      endIcon: endIconProp,
      onClick: onClickProp,
      ...remainingProps
    } = props

    const rootElement: ElementType =
      as !== undefined
        ? as
        : typeof remainingProps.href === 'string' && remainingProps.href
          ? 'a'
          : 'button'

    const ownerState: ButtonOwnerState<RootComponent> = {
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

    const classes = useUtilityClasses<RootComponent>(ownerState)

    const styles = useStyles({
      ownerState,
      name: 'Button',
    })

    const onClick = useEvent((event: MouseEvent) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }
      onClickProp?.(event)
    })

    const startIcon = useMemo(() => {
      return (
        (loading || startIconProp) && (
          <nex.span
            {...slotProps?.startIcon}
            sx={composeSx(styles.startIcon, slotProps?.startIcon?.sx)}
            className={clsx(classes.startIcon, slotProps?.startIcon?.className)}
          >
            {loading ? <LoadingOutlined /> : startIconProp}
          </nex.span>
        )
      )
    }, [
      loading,
      startIconProp,
      styles.startIcon,
      classes.startIcon,
      slotProps?.startIcon,
    ])

    const endIcon = useMemo(() => {
      return (
        endIconProp && (
          <nex.span
            {...slotProps?.endIcon}
            sx={composeSx(styles.endIcon, slotProps?.endIcon?.sx)}
            className={clsx(classes.endIcon, slotProps?.endIcon?.className)}
          >
            {endIconProp}
          </nex.span>
        )
      )
    }, [endIconProp, slotProps?.endIcon, styles.endIcon, classes.endIcon])

    return (
      <nex.button
        ref={ref}
        as={rootElement}
        onClick={onClick}
        disabled={disabled || loading}
        sx={composeSx(styles.root, sx)}
        className={clsx(classes.root, className)}
        {...remainingProps}
      >
        {startIcon}
        {children}
        {endIcon}
      </nex.button>
    )
  },
)

Button.displayName = 'Button'
