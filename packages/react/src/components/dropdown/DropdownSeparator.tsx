'use client'

import { MenuSeparator } from '../menu'
import { dropdownSeparatorRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import type { ElementType } from 'react'
import type { DropdownSeparatorProps } from './types'

const slots = ['root'] as const

export const DropdownSeparator = <RootComponent extends ElementType = 'hr'>(
  inProps: DropdownSeparatorProps<RootComponent>,
) => {
  const props = useDefaultProps<DropdownSeparatorProps>({
    name: 'DropdownSeparator',
    props: inProps,
  })

  const style = useRecipeStyles({
    name: 'DropdownSeparator',
    ownerState: props,
    recipe: dropdownSeparatorRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownSeparator',
    slots,
  })

  const [DropdownSeparatorRoot, getDropdownSeparatorRootProps] = useSlot({
    style,
    component: MenuSeparator,
    externalForwardedProps: props,
    classNames: slotClasses.root,
  })

  return <DropdownSeparatorRoot {...getDropdownSeparatorRootProps()} />
}

DropdownSeparator.displayName = 'DropdownSeparator'
