'use client'

import { ChevronRightOutlined } from '@nex-ui/icons'
import { DropdownItemImpl } from './DropdownItem'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { MenuTriggerItem } from '../menu'
import { dropdownTriggerItemRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { DropdownTriggerItemProps } from './types'

const slots = ['root'] as const

export function DropdownTriggerItem<RootComponent extends ElementType = 'div'>(
  inProps: DropdownTriggerItemProps<RootComponent>,
) {
  const props = useDefaultProps<DropdownTriggerItemProps>({
    name: 'DropdownTriggerItem',
    props: inProps,
  })

  const { children, classNames, slotProps, ...remainingProps } = props

  const style = useRecipeStyles({
    name: 'DropdownTriggerItem',
    recipe: dropdownTriggerItemRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownTriggerItem',
    slots,
  })

  const [DropdownTriggerItemRoot, getDropdownTriggerItemRootProps] = useSlot({
    style,
    component: DropdownItemImpl,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      classNames,
      slotProps,
      rootComponent: MenuTriggerItem,
      endIcon: <ChevronRightOutlined />,
    },
  })

  return (
    <DropdownTriggerItemRoot {...getDropdownTriggerItemRootProps()}>
      {children}
    </DropdownTriggerItemRoot>
  )
}

DropdownTriggerItem.displayName = 'DropdownTriggerItem'
