'use client'

import { useId, useMemo } from 'react'
import { useSlot } from '../utils'
import { MenuItemGroupProvider } from './MenuContext'
import type { MenuItemGroupProps } from './types'
import type { ElementType } from 'react'

export const MenuItemGroup = <RootComponent extends ElementType = 'div'>(
  props: MenuItemGroupProps<RootComponent>,
) => {
  const { children, ...remainingProps } = props
  const ariaId = useId()
  const groupLabelId = `menu-${ariaId}-group-label`

  const [MenuItemGroupRoot, getMenuItemRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    ariaProps: {
      role: 'group',
      'aria-labelledby': groupLabelId,
    },
  })

  const ctx = useMemo(
    () => ({
      groupLabelId,
    }),
    [groupLabelId],
  )

  return (
    <MenuItemGroupRoot {...getMenuItemRootProps()}>
      <MenuItemGroupProvider value={ctx}>{children}</MenuItemGroupProvider>
    </MenuItemGroupRoot>
  )
}

MenuItemGroup.displayName = 'MenuItemGroup'
