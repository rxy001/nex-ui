'use client'

import { useId, useMemo } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import {
  MenuItemIndicatorProvider,
  useMenuRadioItemGroupContext,
} from './MenuContext'
import { MenuItem } from './MenuItem'
import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { MenuRadioItemProps } from './types'
import type { MenuItemIndicatorContextValue } from './MenuContext'

export const MenuRadioItem = <
  T extends string | number,
  RootComponent extends ElementType = 'div',
>(
  inProps: MenuRadioItemProps<T, RootComponent>,
) => {
  const props = inProps as MenuRadioItemProps<T, 'div'>
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
        '[Nex UI] MenuRadioItem: `value` prop is missing. Please provide a unique value for each MenuRadioItem within a MenuRadioItemGroup.',
      )
    }
  }

  const radioGroupCtx = useMenuRadioItemGroupContext()

  const checked = radioGroupCtx.value === value

  const [MenuRadioItemRoot, getMenuRadioItemProps] = useSlot({
    elementType: MenuItem,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    additionalProps: {
      disabled,
      role: 'menuitemradio',
      'aria-checked': checked,
      onClick: () => {
        if (disabled) return
        radioGroupCtx.setValue(value)
      },
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
      <MenuRadioItemRoot {...getMenuRadioItemProps()}>
        {children}
      </MenuRadioItemRoot>
    </MenuItemIndicatorProvider>
  )
}

MenuRadioItem.displayName = 'MenuRadioItem'
