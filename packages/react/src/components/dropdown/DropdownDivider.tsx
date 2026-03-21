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
import type { DropdownDividerProps } from './types'

const slots = ['root'] as const

export const DropdownDivider = <RootComponent extends ElementType = 'hr'>(
  inProps: DropdownDividerProps<RootComponent>,
) => {
  const props = useDefaultProps<DropdownDividerProps>({
    name: 'DropdownDivider',
    props: inProps,
  })

  const style = useRecipeStyles({
    name: 'DropdownDivider',
    ownerState: props,
    recipe: dropdownSeparatorRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownDivider',
    slots,
  })

  const [DropdownDividerRoot, getDropdownDividerRootProps] = useSlot({
    style,
    component: MenuSeparator,
    externalForwardedProps: props,
    classNames: slotClasses.root,
  })

  return <DropdownDividerRoot {...getDropdownDividerRootProps()} />
}

DropdownDivider.displayName = 'DropdownDivider'
