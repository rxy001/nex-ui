'use client'

import { useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { MenuRadioItemGroupProvider } from './MenuContext'
import { MenuItemGroup } from './MenuItemGroup'
import type { ElementType } from 'react'
import type { MenuRadioItemGroupProps } from './types'

export const MenuRadioItemGroup = <
  T extends string | number,
  RootComponent extends ElementType = 'div',
>(
  inProps: MenuRadioItemGroupProps<T, RootComponent>,
) => {
  const props = inProps as MenuRadioItemGroupProps<string | number, 'div'>
  const {
    children,
    value: valueProp,
    onValueChange,
    defaultValue,
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
      <MenuRadioItemGroupProvider value={ctx}>
        {children}
      </MenuRadioItemGroupProvider>
    </MenuItemGroup>
  )
}

MenuRadioItemGroup.displayName = 'MenuRadioItemGroup'
