/* eslint-disable react/prop-types */

import clsx from 'clsx'
import { composeSx, styled } from '@nex-ui/styled'
import type { ComponentType, ElementType, Ref } from 'react'
import { useNexContext } from '../provider/Context'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
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
  const Icon = styled(svgComponent)()

  return forwardRef(
    <RootComponent extends ElementType = 'svg'>(
      inProps: InnerIconProps<RootComponent>,
      ref: Ref<SVGSVGElement>,
    ) => {
      const props = useDefaultProps<InnerIconProps>({
        name: 'Icon',
        props: { ...defaultProps, ...inProps },
      })

      const {
        sx,
        color,
        className,
        spin = false,
        fontSize = 'md',
        width = '1em',
        height = '1em',
        ...remainingProps
      } = props

      const ownerState = {
        ...props,
        spin,
        fontSize,
        width,
        height,
        component: svgComponent,
      }

      const styles = useStyles({
        ownerState,
        name: 'Icon',
      })

      const classes = useUtilityClasses(ownerState)

      const composedSx = composeSx(
        {
          color,
          width,
          height,
          fs: fontSize,
          ...styles,
        },
        sx,
      )

      return (
        <Icon
          {...remainingProps}
          sx={composedSx}
          ref={ref}
          className={clsx(classes.root, defaultClassName, className)}
        />
      )
    },
  )
}
