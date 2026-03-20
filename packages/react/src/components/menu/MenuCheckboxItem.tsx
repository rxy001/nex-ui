'use client'

import { useId, useMemo } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import {
  useMenuCheckboxItemGroupContext,
  MenuItemIndicatorProvider,
} from './MenuContext'
import { MenuItem } from './MenuItem'
import { useSlot } from '../utils'
import type { MenuCheckboxItemProps } from './types'
import type { MenuItemIndicatorContextValue } from './MenuContext'

export const MenuCheckboxItem = (props: MenuCheckboxItemProps) => {
  const defaultValue = useId()

  const {
    children,
    onCheckedChange,
    disabled = false,
    value = defaultValue,
    ...remainingProps
  } = props

  if (__DEV__) {
    if (!('value' in props)) {
      console.warn(
        '[Nex UI] MenuCheckboxItem: `value` prop is missing. Please provide a unique value for each MenuCheckboxItem within a MenuCheckboxItemGroup.',
      )
    }
  }

  const checkboxGroupCtx = useMenuCheckboxItemGroupContext()

  const checked = checkboxGroupCtx.value.includes(value)

  const handleSelect = () => {
    checkboxGroupCtx.setValue(
      checked
        ? checkboxGroupCtx.value.filter((val) => val !== value)
        : [...checkboxGroupCtx.value, value],
    )
    onCheckedChange?.(!checked)
  }

  const [MenuCheckboxItemRoot, getMenuCheckboxItemProps] = useSlot({
    component: MenuItem,
    externalForwardedProps: remainingProps,
    additionalProps: {
      disabled,
      onSelect: handleSelect,
    },
    dataAttrs: {
      checked,
      value,
    },
    ariaProps: {
      role: 'menuitemcheckbox',
      'aria-checked': checked,
    },
  })

  const ctx = useMemo<MenuItemIndicatorContextValue>(
    () => ({ checked }),
    [checked],
  )

  return (
    <MenuItemIndicatorProvider value={ctx}>
      <MenuCheckboxItemRoot {...getMenuCheckboxItemProps()}>
        {children}
      </MenuCheckboxItemRoot>
    </MenuItemIndicatorProvider>
  )
}

MenuCheckboxItem.displayName = 'MenuCheckboxItem'
