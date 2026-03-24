'use client'

import { useMemo } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { MenuCheckboxItemGroupProvider } from './MenuContext'
import { MenuItemGroup } from './MenuItemGroup'
import type { MenuCheckboxItemGroupProps } from './types'

const DEFAULT_VALUE: (number | string)[] = []
export function MenuCheckboxItemGroup<
  T extends string | number = string | number,
>(inProps: MenuCheckboxItemGroupProps<T>) {
  const props = inProps as unknown as MenuCheckboxItemGroupProps<
    number | string
  >

  const {
    children,
    value = DEFAULT_VALUE,
    onValueChange,
    ...remainingProps
  } = props

  const setValue = useEvent((val: (number | string)[]) => {
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
      <MenuCheckboxItemGroupProvider value={ctx}>
        {children}
      </MenuCheckboxItemGroupProvider>
    </MenuItemGroup>
  )
}

MenuCheckboxItemGroup.displayName = 'MenuCheckboxItemGroup'
