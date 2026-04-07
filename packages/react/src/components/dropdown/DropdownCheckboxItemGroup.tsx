'use client'

import { MenuCheckboxItemGroup } from '../menu'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { dropdownCheckboxItemGroupRecipe } from '../../themes/recipes'
import { DropdownItemGroupImpl } from './DropdownItemGroup'
import type { ElementType } from 'react'
import type { DropdownCheckboxItemGroupProps } from './types'

const slots = ['root'] as const

export function DropdownCheckboxItemGroup<
  T extends string | number = string | number,
  RootComponent extends ElementType = 'div',
>(inProps: DropdownCheckboxItemGroupProps<T, RootComponent>) {
  const props = useDefaultProps<
    DropdownCheckboxItemGroupProps<string | number, 'div'>
  >({
    name: 'DropdownCheckboxItemGroup',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const style = useRecipeStyles({
    name: 'DropdownCheckboxItemGroup',
    recipe: dropdownCheckboxItemGroupRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownCheckboxItemGroup',
    slots,
  })

  const [DropdownCheckboxItemGroupRoot, getDropdownCheckboxItemGroupRootProps] =
    useSlot({
      style,
      component: DropdownItemGroupImpl,
      externalForwardedProps: remainingProps,
      classNames: slotClasses.root,
      additionalProps: {
        rootComponent: MenuCheckboxItemGroup,
      },
    })

  return (
    <DropdownCheckboxItemGroupRoot {...getDropdownCheckboxItemGroupRootProps()}>
      {children}
    </DropdownCheckboxItemGroupRoot>
  )
}

DropdownCheckboxItemGroup.displayName = 'DropdownCheckboxItemGroup'
