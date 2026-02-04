'use client'

import { useId, useMemo } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { __DEV__ } from '@nex-ui/utils'
import {
  useMenuCheckboxItemGroupContext,
  MenuItemIndicatorProvider,
} from './MenuContext'
import { MenuItem } from './MenuItem'
import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { MenuCheckboxItemProps } from './types'
import type { MenuItemIndicatorContextValue } from './MenuContext'

export const MenuCheckboxItem = <
  T extends string | number,
  RootComponent extends ElementType = 'div',
>(
  inProps: MenuCheckboxItemProps<T, RootComponent>,
) => {
  const props = inProps as MenuCheckboxItemProps<T, 'div'>
  const defaultValue = useId()

  const {
    children,
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

  const handleClick = useEvent(() => {
    if (disabled) {
      return
    }
    checkboxGroupCtx.setValue(
      checked
        ? checkboxGroupCtx.value.filter((val) => val !== value)
        : [...checkboxGroupCtx.value, value],
    )
  })

  const [MenuCheckboxItemRoot, getMenuCheckboxItemProps] = useSlot({
    elementType: MenuItem,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    additionalProps: {
      disabled,
      role: 'menuitemcheckbox',
      'aria-checked': checked,
      onClick: handleClick,
    },
    dataAttrs: {
      checked,
      value,
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
