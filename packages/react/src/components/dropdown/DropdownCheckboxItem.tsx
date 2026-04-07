'use client'

import { nex } from '@nex-ui/styled'
import { CheckOutlined } from '@nex-ui/icons'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { MenuCheckboxItem, MenuItemIndicator } from '../menu'
import { dropdownCheckboxItemRecipe } from '../../themes/recipes'
import { DropdownItemImpl } from './DropdownItem'
import { useDropdownIndicator } from './useDropdownIndicator'
import type { ElementType } from 'react'
import type { DropdownCheckboxItemProps } from './types'

const slots = ['root', 'indicator'] as const

export function DropdownCheckboxItem<RootComponent extends ElementType = 'div'>(
  inProps: DropdownCheckboxItemProps<RootComponent>,
) {
  const props = useDefaultProps<DropdownCheckboxItemProps>({
    name: 'DropdownCheckboxItem',
    props: inProps,
  })

  const { children, classNames, slotProps, indicator, ...remainingProps } =
    props

  const styles = useRecipeStyles({
    name: 'DropdownCheckboxItem',
    recipe: dropdownCheckboxItemRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownCheckboxItem',
    slots,
    classNames,
  })

  const [DropdownCheckboxItemIndicator, getDropdownCheckboxItemIndicatorProps] =
    useSlot({
      component: nex.span,
      style: styles.indicator,
      externalForwardedProps: slotProps?.indicator,
      classNames: slotClasses.indicator,
    })

  const [DropdownCheckboxItemRoot, getDropdownCheckboxItemProps] = useSlot({
    component: DropdownItemImpl,
    style: styles.root,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      slotProps: {
        shortcut: slotProps?.shortcut,
        content: slotProps?.content,
        startIcon: slotProps?.startIcon,
        endIcon: slotProps?.endIcon,
      },
      classNames: {
        shortcut: classNames?.shortcut,
        content: classNames?.content,
        startIcon: classNames?.startIcon,
        endIcon: classNames?.endIcon,
      },
      rootComponent: MenuCheckboxItem,
      indicator: (
        <MenuItemIndicator>
          <DropdownCheckboxItemIndicator
            {...getDropdownCheckboxItemIndicatorProps()}
          >
            {indicator ?? <CheckOutlined />}
          </DropdownCheckboxItemIndicator>
        </MenuItemIndicator>
      ),
    },
  })

  useDropdownIndicator()

  return (
    <DropdownCheckboxItemRoot {...getDropdownCheckboxItemProps()}>
      {children}
    </DropdownCheckboxItemRoot>
  )
}

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem'
