'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { dividerRecipe } from '../../themes/recipes'
import type { ElementType } from 'react'
import type { DividerProps } from './types'

const slots = ['root'] as const

export function Divider<RootComponent extends ElementType = 'hr'>(
  inProps: DividerProps<RootComponent>,
) {
  const props = useDefaultProps<DividerProps>({
    name: 'Divider',
    props: inProps,
  })

  const { orientation = 'horizontal', ...remainingProps } = props

  const ownerState: DividerProps = { ...props, orientation }

  const slotClasses = useSlotClasses({
    name: 'Divider',
    slots,
  })

  const style = useRecipeStyles({
    ownerState,
    name: 'Divider',
    recipe: dividerRecipe,
  })

  const [DividerRoot, getDividerRootProps] = useSlot({
    style,
    component: nex.hr,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    ariaProps: {
      role: 'separator',
      'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
    },
    dataAttrs: {
      orientation,
    },
  })

  return <DividerRoot {...getDividerRootProps()} />
}

Divider.displayName = 'Divider'
