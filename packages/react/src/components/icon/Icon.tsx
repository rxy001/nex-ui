'use client'

import { nex } from '@nex-ui/styled'
import type { ElementType, Ref } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import { useNexUI } from '../provider/Context'
import { iconRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
} from '../utils'
import type { IconOwnerState, IconProps } from './types'

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

export const Icon = forwardRef(
  <RootComponent extends ElementType = 'svg'>(
    inProps: IconProps<RootComponent>,
    ref: Ref<SVGSVGElement>,
  ) => {
    const props = useDefaultProps<IconProps>({
      name: 'Icon',
      props: inProps,
    })

    const {
      color,
      component,
      spin = false,
      size = 'md',
      width = '1em',
      height = '1em',
      ...remainingProps
    } = props

    if (__DEV__ && !component) {
      console.warn('[Nex UI] Icon: Please pass the "component" property.')
    }

    const ownerState = {
      ...props,
      spin,
      size,
      width,
      height,
    }

    const styles = useStyles({
      ownerState,
      name: 'Icon',
      recipe: iconRecipe,
    })

    const classes = useSlotClasses(ownerState)

    const rootIcon = useSlotProps({
      ownerState,
      externalForwardedProps: remainingProps,
      sx: styles,
      classNames: classes.root,
      additionalProps: {
        ref,
        sx: {
          color,
          width,
          height,
        },
      },
    })

    return <nex.span as={component} {...rootIcon} />
  },
)

Icon.displayName = 'Icon'
