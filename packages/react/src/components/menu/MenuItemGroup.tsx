'use client'

import { useId, useMemo } from 'react'
import { useSlot } from '../utils'
import { MenuItemGroupProvider } from './MenuContext'
import type { MenuItemGroupProps } from './types'
import type { ElementType } from 'react'

export const MenuItemGroup = <RootComponent extends ElementType = 'div'>(
  props: MenuItemGroupProps<RootComponent>,
) => {
  const id = useId()
  const labelId = `menu-${id}-group-label`
  const { children, ...remainingProps } = props

  const [MenuItemGroupRoot, getMenuItemRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      role: 'group',
      'aria-labelledby': labelId,
    },
  })

  const ctx = useMemo(() => ({ labelId }), [labelId])

  return (
    <MenuItemGroupRoot {...getMenuItemRootProps()}>
      <MenuItemGroupProvider value={ctx}>{children}</MenuItemGroupProvider>
    </MenuItemGroupRoot>
  )
}

MenuItemGroup.displayName = 'MenuItemGroup'
