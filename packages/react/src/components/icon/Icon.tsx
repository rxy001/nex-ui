'use client'

import { __DEV__ } from '@nex-ui/utils'
import { iconRecipe } from '../../theme/recipes'
import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import type { ElementType } from 'react'
import type { IconProps } from './types'

const slots = ['root']

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

  const ownerState: IconProps = {
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

  const slotClasses = useSlotClasses({
    name: 'Icon',
    slots,
  })

  const [IconRoot, getIconRootProps] = useSlot({
    style,
    elementType: 'svg',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
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
    dataAttrs: {
      size,
      spin,
    },
  })

  return <IconRoot {...getIconRootProps()} />
}

Icon.displayName = 'Icon'
