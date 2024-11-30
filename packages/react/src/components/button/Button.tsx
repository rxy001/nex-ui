'use client'

import { forwardRef, useMemo } from 'react'
import type { Ref, MouseEvent } from 'react'
import classNames from 'classnames'
import { LoadingOutlined } from '@nex-ui/icons'
import { useEvent } from '@nex-ui/utils'
import { nex, composeSx } from '@nex-ui/styled'
import { useNexContext } from '../provider'
import {
  useStyles,
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  WaterWave,
} from '../utils'
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
    getUtilityClass(btnRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((inProps, ref) => {
  const props = useDefaultProps({
    name: 'Button',
    props: inProps,
  })

  const {
    as,
    sx,
    href,
    className,
    children,
    variant = 'solid',
    size = 'md',
    radius = size,
    iconOnly = false,
    loading = false,
    disabled = false,
    block = false,
    color = 'blue',
    startIcon: startIconProp,
    endIcon: endIconProp,
    onClick: onClickProp,
    ...remainingProps
  } = props

  const htmlElement: keyof JSX.IntrinsicElements =
    as !== undefined ? as : typeof href === 'string' && href ? 'a' : 'button'

  const ownerState: ButtonOwnerState = {
    ...props,
    variant,
    size,
    radius,
    iconOnly,
    loading,
    disabled,
    block,
    color,
    as: htmlElement,
  }

  const classes = useUtilityClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Button',
  })

  const mergedSx = composeSx(styles.root, sx)

  const onClick = useEvent(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }
      ;(onClickProp as ButtonProps['onClick'])?.(event)
    },
  )

  const startIcon = useMemo(() => {
    return (
      (loading || startIconProp) && (
        <nex.span sx={styles.startIcon} className={classes.startIcon}>
          {loading ? <LoadingOutlined /> : startIconProp}
        </nex.span>
      )
    )
  }, [styles.startIcon, loading, startIconProp, classes.startIcon])

  const endIcon = useMemo(() => {
    return (
      endIconProp && (
        <nex.span sx={styles.endIcon} className={classes.endIcon}>
          {endIconProp}
        </nex.span>
      )
    )
  }, [styles.endIcon, endIconProp, classes.endIcon])

  const childNode = (
    <nex.button
      sx={mergedSx}
      onClick={onClick}
      as={htmlElement}
      className={classNames(classes.root, className)}
      ref={ref as Ref<HTMLButtonElement>}
      disabled={disabled || loading}
      {...remainingProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </nex.button>
  )

  return <WaterWave disabled={loading || disabled}>{childNode}</WaterWave>
})

Button.displayName = 'Button'
