'use client'

import classNames from 'classnames'
import { LoadingOutlined } from '@nex-ui/icons'
import { useMemo } from 'react'
import { useEvent } from '@nex-ui/utils'
import { nex } from '@nex-ui/styled'
import type { MouseEvent } from 'react'
import type { HTMLElementTagName } from '@nex-ui/styled'
import { useNexContext } from '../provider'
import { useStyles, useDefaultProps, composeClasses } from '../utils'
import { getButtonUtilityClass } from './buttonClasses'
import type { ButtonProps, ButtonOwnerState } from './types'

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
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
    block,
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
      block && `block`,
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
    getButtonUtilityClass(btnRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

export const useButton = (inProps: ButtonProps) => {
  const props = useDefaultProps({
    name: 'Button',
    props: inProps,
  })

  const {
    href,
    sx,
    className,
    children,
    variant = 'solid',
    size = 'md',
    radius = size,
    iconOnly = false,
    loading = false,
    disabled = false,
    block = false,
    type = 'button',
    color = 'blue',
    startIcon: startIconProp,
    endIcon: endIconProp,
    onClick: onClickProp,
    ...remainingProps
  } = props

  const ownerState: ButtonOwnerState = {
    ...props,
    href,
    className,
    variant,
    size,
    radius,
    iconOnly,
    loading,
    disabled,
    block,
    type,
    color,
    startIcon: startIconProp,
    endIcon: endIconProp,
    onClick: onClickProp,
  }

  const classes = useUtilityClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Button',
  })

  const htmlElement: HTMLElementTagName =
    typeof href === 'string' && href ? 'a' : 'button'

  const onClick = useEvent(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }

      ;(onClickProp as ButtonProps['onClick'])?.(event)
    },
  )

  const startIcon = useMemo(
    () =>
      (loading || startIconProp) && (
        <nex.span sx={styles.startIcon} className={classes.startIcon}>
          {loading ? <LoadingOutlined fontSize="sm" /> : startIconProp}
        </nex.span>
      ),
    [loading, startIconProp, classes.startIcon, styles.startIcon],
  )

  const endIcon = useMemo(
    () =>
      endIconProp && (
        <nex.span className={classes.endIcon} sx={styles.endIcon}>
          {endIconProp}
        </nex.span>
      ),
    [endIconProp, classes.endIcon, styles.endIcon],
  )

  return {
    startIcon,
    endIcon,
    children,
    rootProps: {
      onClick,
      colorPalette: color,
      className: classNames(classes.root, className),
      sx: {
        ...styles.root,
        ...sx,
      },
      ...(htmlElement === 'a'
        ? {
            href,
            as: htmlElement,
            'data-disabled': disabled || loading || null,
          }
        : {
            type,
            disabled: disabled || loading,
          }),
      ...remainingProps,
    },
  }
}
