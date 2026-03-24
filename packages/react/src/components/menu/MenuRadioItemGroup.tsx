'use client'

import { useMemo } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { MenuRadioItemGroupProvider } from './MenuContext'
import { MenuItemGroup } from './MenuItemGroup'
import type { MenuRadioItemGroupProps } from './types'

export function MenuRadioItemGroup<T extends string | number = string | number>(
  inProps: MenuRadioItemGroupProps<T>,
) {
  const props = inProps as unknown as MenuRadioItemGroupProps<string | number>

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
