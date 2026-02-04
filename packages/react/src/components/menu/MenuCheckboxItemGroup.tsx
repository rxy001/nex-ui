'use client'

import { useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { MenuCheckboxItemGroupProvider } from './MenuContext'
import { MenuItemGroup } from './MenuItemGroup'
import type { ElementType } from 'react'
import type { MenuCheckboxItemGroupProps } from './types'

export const MenuCheckboxItemGroup = <
  T extends string | number,
  RootComponent extends ElementType = 'div',
>(
  inProps: MenuCheckboxItemGroupProps<T, RootComponent>,
) => {
  const props = inProps as MenuCheckboxItemGroupProps<string | number, 'div'>

  const {
    children,
    value: valueProp,
    onValueChange,
    defaultValue = [],
    ...remainingProps
  } = props

  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue,
    onValueChange,
  )

  const ctx = useMemo(
    () => ({
      value,
      setValue,
    }),
    [setValue, value],
  )

  return (
    <MenuItemGroup {...remainingProps}>
      <MenuCheckboxItemGroupProvider value={ctx}>
        {children}
      </MenuCheckboxItemGroupProvider>
    </MenuItemGroup>
  )
}

MenuCheckboxItemGroup.displayName = 'MenuCheckboxItemGroup'
