'use client'

import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { MenuItemGroupLabelProps } from './types'

export const MenuItemGroupLabel = <RootComponent extends ElementType = 'div'>(
  props: MenuItemGroupLabelProps<RootComponent>,
) => {
  const { children, ...remainingProps } = props

  const [MenuItemGroupLabelRoot, getMenuItemGroupLabelRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
  })

  return (
    <MenuItemGroupLabelRoot {...getMenuItemGroupLabelRootProps()}>
      {children}
    </MenuItemGroupLabelRoot>
  )
}

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
