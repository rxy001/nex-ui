'use client'

import { __DEV__ } from '@nex-ui/utils'
import { useNexUI } from '../provider/Context'
import { iconRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import type { ElementType } from 'react'
import type { IconOwnerState, IconProps } from './types'

const useSlotClasses = (ownerState: IconOwnerState) => {
  const { prefix } = useNexUI()

  const iconRoot = `${prefix}-icon`

  const { spin, size } = ownerState

  const slots = {
    root: ['root', spin && `spin`, size && `size-${size}`],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(iconRoot))

  return composedClasses
}

export const Icon = <RootComponent extends ElementType = 'svg'>(
  inProps: IconProps<RootComponent>,
) => {
  const props = useDefaultProps<IconProps>({
    name: 'Icon',
    props: inProps,
  })

  const {
    as,
    color,
    focusable = false,
    spin = false,
    size = 'md',
    width = '1em',
    height = '1em',
    ...remainingProps
  } = props

  if (__DEV__ && !as) {
    console.warn('[Nex UI] Icon: Please pass the "as" property.')
  }

  const ownerState: IconOwnerState = {
    ...props,
    color,
    as,
    spin,
    size,
    width,
    height,
  }

  const style = useStyles({
    ownerState,
    name: 'Icon',
    recipe: iconRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const [IconRoot, getIconRootProps] = useSlot({
    style,
    ownerState,
    elementType: 'svg',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    a11y: {
      focusable,
      'aria-hidden': props['aria-hidden'] ?? true,
    },
    additionalProps: {
      as,
      sx: {
        color,
        width,
        height,
      },
    },
  })

  return <IconRoot {...getIconRootProps()} />
}

Icon.displayName = 'Icon'
