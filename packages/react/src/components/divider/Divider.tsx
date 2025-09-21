'use client'

import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { dividerRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { DividerProps } from './types'

const slots = ['root']

export const Divider = <RootComponent extends ElementType = 'hr'>(
  inProps: DividerProps<RootComponent>,
) => {
  const props = useDefaultProps<DividerProps>({
    name: 'Divider',
    props: inProps,
  })

  const {
    role = 'separator',
    orientation = 'horizontal',
    ...remainingProps
  } = props

  const ownerState: DividerProps = { ...props, orientation }

  const slotClasses = useSlotClasses({
    name: 'Divider',
    slots,
  })

  const style = useStyles({
    ownerState,
    name: 'Divider',
    recipe: dividerRecipe,
  })

  const [DividerRoot, getDividerRootProps] = useSlot({
    style,
    elementType: 'hr',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    a11y: {
      role,
    },
    dataAttrs: {
      orientation,
    },
  })

  return <DividerRoot {...getDividerRootProps()} />
}

Divider.displayName = 'Divider'
