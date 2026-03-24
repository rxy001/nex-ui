'use client'

import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { MenuItemGroup } from '../menu'
import { dropdownItemGroupRecipe } from '../../theme/recipes'
import type { ComponentType, ElementType } from 'react'
import type { DropdownItemGroupProps } from './types'
import type { Interpolation } from '@nex-ui/system'

const slots = ['root'] as const

type DropdownItemGroupImpl = DropdownItemGroupProps & {
  rootComponent?: ComponentType<{
    sx?: Interpolation
  }>
}

export function DropdownItemGroupImpl(inProps: DropdownItemGroupImpl) {
  const props = useDefaultProps<DropdownItemGroupImpl>({
    name: 'DropdownItemGroup',
    props: inProps,
  })

  const { children, rootComponent = MenuItemGroup, ...remainingProps } = props

  const style = useRecipeStyles({
    name: 'DropdownItemGroup',
    recipe: dropdownItemGroupRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownItemGroup',
    slots,
  })

  const [DropdownItemGroupRoot, getDropdownItemGroupRootProps] = useSlot({
    style,
    component: rootComponent,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
  })

  return (
    <DropdownItemGroupRoot {...getDropdownItemGroupRootProps()}>
      {children}
    </DropdownItemGroupRoot>
  )
}

DropdownItemGroupImpl.displayName = 'DropdownItemGroupImpl'

export function DropdownItemGroup<RootComponent extends ElementType = 'div'>(
  inProps: DropdownItemGroupProps<RootComponent>,
) {
  return (
    <DropdownItemGroupImpl
      rootComponent={MenuItemGroup}
      {...(inProps as DropdownItemGroupProps)}
    />
  )
}

DropdownItemGroup.displayName = 'DropdownItemGroup'
