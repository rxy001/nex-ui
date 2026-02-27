'use client'

import { useEffect } from 'react'
import { useSlot } from '../utils'
import { useMenuItemGroupContext } from './MenuContext'
import type { MenuItemGroupLabelProps } from './types'

export const MenuItemGroupLabel = (props: MenuItemGroupLabelProps) => {
  const { children, ...remainingProps } = props
  const { groupLabelId, registerLabel, unregisterLabel } =
    useMenuItemGroupContext()

  useEffect(() => {
    registerLabel()
    return unregisterLabel
  }, [registerLabel, unregisterLabel])

  const [MenuItemGroupLabelRoot, getMenuItemGroupLabelRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    ariaProps: {
      id: groupLabelId,
    },
  })

  return (
    <MenuItemGroupLabelRoot {...getMenuItemGroupLabelRootProps()}>
      {children}
    </MenuItemGroupLabelRoot>
  )
}

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
