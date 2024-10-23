/* eslint-disable react/prop-types */

import classNames from 'classnames'
import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { ComponentType, Ref } from 'react'
import { useNexContext } from '../provider/Context'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import type { IconOwnerState, InnerIconProps } from './types'

const useUtilityClasses = (ownerState: IconOwnerState) => {
  const { prefix } = useNexContext()

  const iconRoot = `${prefix}-icon`

  const { spin, fontSize, width, height, classes } = ownerState

  const slots = {
    root: [
      'root',
      spin && `spin-${spin}`,
      `font-size-${fontSize}`,
      `width-${width}`,
      `height-${height}`,
    ],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(iconRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

export const createIcon = (
  svgComponent: ComponentType<any>,
  {
    className: defaultClassName,
    ...defaultProps
  }: InnerIconProps | undefined = {},
) => {
  // @ts-ignore
  return forwardRef((inProps: InnerIconProps, ref: Ref<SVGElement>) => {
    const props = useDefaultProps({
      name: 'Icon',
      props: { ...defaultProps, ...inProps },
    })

    const {
      colorPalette,
      sx,
      as,
      color,
      className,
      spin = false,
      fontSize = 'md',
      width = '1em',
      height = '1em',
      ...remainingProps
    } = props

    const ownerState: IconOwnerState = {
      ...props,
      color,
      spin,
      className,
      fontSize,
      width,
      height,
    }

    const styles = useStyles({
      ownerState,
      name: 'Icon',
    })

    const classes = useUtilityClasses(ownerState)

    const Icon = nex(svgComponent)

    return (
      <Icon
        sx={{
          color,
          width,
          height,
          fs: fontSize,
          ...styles,
          ...sx,
        }}
        colorPalette={colorPalette}
        as={as}
        ref={ref}
        className={classNames(classes.root, defaultClassName, className)}
        {...remainingProps}
        classes={null}
      />
    )
  })
}
