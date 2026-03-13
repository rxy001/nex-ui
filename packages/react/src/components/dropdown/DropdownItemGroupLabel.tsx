'use client'

import { MenuItemGroupLabel } from '../menu'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { dropdownItemGroupLabelRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { DropdownItemGroupLabelProps } from './types'

const slots = ['root'] as const

export const DropdownItemGroupLabel = <
  RootComponent extends ElementType = 'div',
>(
  inProps: DropdownItemGroupLabelProps<RootComponent>,
) => {
  const props = useDefaultProps<DropdownItemGroupLabelProps>({
    name: 'DropdownItemGroupLabel',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const style = useRecipeStyles({
    name: 'DropdownItemGroupLabel',
    recipe: dropdownItemGroupLabelRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownItemGroupLabel',
    slots,
  })

  const [DropdownItemGroupLabelRoot, getDropdownItemGroupLabelRootProps] =
    useSlot({
      style,
      component: MenuItemGroupLabel,
      classNames: slotClasses.root,
      externalForwardedProps: remainingProps,
    })

  return (
    <DropdownItemGroupLabelRoot {...getDropdownItemGroupLabelRootProps()}>
      {children}
    </DropdownItemGroupLabelRoot>
  )
}

DropdownItemGroupLabel.displayName = 'DropdownItemGroupLabel'
