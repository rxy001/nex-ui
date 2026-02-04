'use client'

import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { MenuItemGroupProps } from './types'

export const MenuItemGroup = <RootComponent extends ElementType = 'div'>(
  props: MenuItemGroupProps<RootComponent>,
) => {
  const { children, ...remainingProps } = props

  const [MenuItemGroupRoot, getMenuItemRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      role: 'group',
    },
  })

  return (
    <MenuItemGroupRoot {...getMenuItemRootProps()}>
      {children}
    </MenuItemGroupRoot>
  )
}

MenuItemGroup.displayName = 'MenuItemGroup'
