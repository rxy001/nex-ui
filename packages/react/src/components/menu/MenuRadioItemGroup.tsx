'use client'

import { useMemo } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { MenuRadioItemGroupProvider } from './MenuContext'
import { MenuItemGroup } from './MenuItemGroup'
import type { MenuRadioItemGroupProps } from './types'

export const MenuRadioItemGroup = <T extends string | number = string | number>(
  inProps: MenuRadioItemGroupProps<T>,
) => {
  const props = inProps as MenuRadioItemGroupProps<number | string>

  const { children, value, onValueChange, ...remainingProps } = props

  const setValue = useEvent((val: number | string) => {
    onValueChange?.(val)
  })

  const ctx = useMemo(
    () => ({
      value,
      setValue,
    }),
    [setValue, value],
  )

  return (
    <MenuItemGroup {...remainingProps}>
      <MenuRadioItemGroupProvider value={ctx}>
        {children}
      </MenuRadioItemGroupProvider>
    </MenuItemGroup>
  )
}

MenuRadioItemGroup.displayName = 'MenuRadioItemGroup'
