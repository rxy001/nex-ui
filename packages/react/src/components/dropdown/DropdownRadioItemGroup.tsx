'use client'

import { MenuRadioItemGroup } from '../menu'
import { DropdownItemGroupImpl } from './DropdownItemGroup'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { dropdownRadioItemGroupRecipe } from '../../themes/recipes'
import type { ElementType } from 'react'
import type { DropdownRadioItemGroupProps } from './types'

const slots = ['root']

export function DropdownRadioItemGroup<
  T extends string | number = string | number,
  RootComponent extends ElementType = 'div',
>(inProps: DropdownRadioItemGroupProps<T, RootComponent>) {
  const props = useDefaultProps<
    DropdownRadioItemGroupProps<string | number, 'div'>
  >({
    name: 'DropdownRadioItemGroup',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const style = useRecipeStyles({
    name: 'DropdownRadioItemGroup',
    recipe: dropdownRadioItemGroupRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownRadioItemGroup',
    slots,
  })

  const [DropdownRadioItemGroupRoot, getDropdownRadioItemGroupRootProps] =
    useSlot({
      style,
      component: DropdownItemGroupImpl,
      externalForwardedProps: remainingProps,
      classNames: slotClasses.root,
      additionalProps: {
        rootComponent: MenuRadioItemGroup,
      },
    })

  return (
    <DropdownRadioItemGroupRoot {...getDropdownRadioItemGroupRootProps()}>
      {children}
    </DropdownRadioItemGroupRoot>
  )
}

DropdownRadioItemGroup.displayName = 'DropdownRadioItemGroup'
