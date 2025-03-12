/* eslint-disable react/prop-types */

import clsx from 'clsx'
import { styled } from '@nex-ui/styled'
import type { ComponentType, ElementType, Ref } from 'react'
import { useNexUI } from '../provider/Context'
import { iconRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  resolveSxProps,
} from '../utils'
import type { IconOwnerState, InnerIconProps } from './types'

const useSlotClasses = (ownerState: IconOwnerState) => {
  const { prefix } = useNexUI()

  const iconRoot = `${prefix}-icon`

  const { spin, width, height, size } = ownerState

  const slots = {
    root: [
      'root',
      spin && `spin-${spin}`,
      size && `size-${size}`,
      `width-${width}`,
      `height-${height}`,
    ],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(iconRoot))

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
        size = 'md',
        width = '1em',
        height = '1em',
        ...remainingProps
      } = props

      const ownerState = {
        ...props,
        spin,
        size,
        width,
        height,
        component: svgComponent,
      }

      const styles = useStyles({
        ownerState,
        name: 'Icon',
        recipe: iconRecipe,
      })

      const classes = useSlotClasses(ownerState)

      const composedSx = {
        color,
        width,
        height,
        fs: size,
        ...styles,
      }

      const rootIcon = useSlotProps({
        externalSlotProps: remainingProps,
        externalForwardedProps: { ref, className },
        sx: [composedSx, resolveSxProps(sx, ownerState)],
        classNames: clsx(classes.root, defaultClassName),
      })

      return <Icon {...rootIcon} />
    },
  )
}
