'use client'

import { nex } from '@nex-ui/styled'
import { __DEV__ } from '@nex-ui/utils'
import { iconRecipe } from '../../themes/recipes'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import type { ElementType } from 'react'
import type { IconProps } from './types'

const slots = ['root'] as const

export function Icon<RootComponent extends ElementType = 'svg'>(
  inProps: IconProps<RootComponent>,
) {
  const props = useDefaultProps<IconProps>({
    name: 'Icon',
    props: inProps,
  })

  const {
    as,
    color,
    spin = false,
    size = 'md',
    width = '1em',
    height = '1em',
    ...remainingProps
  } = props

  if (__DEV__ && !as) {
    console.warn('[Nex UI] Icon: Please pass the "as" property.')
  }

  const ownerState: IconProps = {
    ...props,
    color,
    as,
    spin,
    size,
    width,
    height,
  }

  const style = useRecipeStyles({
    ownerState,
    name: 'Icon',
    recipe: iconRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'Icon',
    slots,
  })

  const [IconRoot, getIconRootProps] = useSlot({
    style,
    component: nex.svg,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    ariaProps: {
      focusable: false,
      'aria-hidden': true,
    },
    additionalProps: {
      as,
      sx: {
        color,
        width,
        height,
      },
    },
    dataAttrs: {
      size,
      spin,
    },
  })

  return <IconRoot {...getIconRootProps()} />
}

Icon.displayName = 'Icon'
