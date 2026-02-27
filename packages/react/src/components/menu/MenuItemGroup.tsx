'use client'

import { nex } from '@nex-ui/styled'
import { useId, useMemo, useState } from 'react'
import { useSlot } from '../utils'
import { MenuItemGroupProvider } from './MenuContext'
import type { MenuItemGroupProps } from './types'
import type { MenuItemGroupContextValue } from './MenuContext'

export const MenuItemGroup = (props: MenuItemGroupProps) => {
  const { children, ...remainingProps } = props
  const ariaId = useId()
  const groupLabelId = `menu-${ariaId}-group-label`

  const [hasLabel, setHasLabel] = useState(false)

  const ariaProps = useMemo(
    () => ({
      role: 'group',
      ...(hasLabel && {
        'aria-labelledby': groupLabelId,
      }),
    }),
    [groupLabelId, hasLabel],
  )

  const [MenuItemGroupRoot, getMenuItemRootProps] = useSlot({
    component: nex.div,
    externalForwardedProps: remainingProps,
    ariaProps,
  })

  const ctx = useMemo<MenuItemGroupContextValue>(
    () => ({
      groupLabelId,
      registerLabel: () => setHasLabel(true),
      unregisterLabel: () => setHasLabel(false),
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
