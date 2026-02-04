'use client'

import { useSlot } from '../utils'
import { useMenuItemGroupContext } from './MenuContext'
import type { ElementType } from 'react'
import type { MenuItemGroupLabelProps } from './types'

export const MenuItemGroupLabel = <RootComponent extends ElementType = 'div'>(
  props: MenuItemGroupLabelProps<RootComponent>,
) => {
  const { children, ...remainingProps } = props
  const { labelId } = useMenuItemGroupContext()

  const [MenuItemGroupLabelRoot, getMenuItemGroupLabelRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      id: labelId,
    },
  })

  return (
    <MenuItemGroupLabelRoot {...getMenuItemGroupLabelRootProps()}>
      {children}
    </MenuItemGroupLabelRoot>
  )
}

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
