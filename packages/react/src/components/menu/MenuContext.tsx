import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

export interface MenuContextValue {
  open?: boolean
  setOpen: (open: boolean) => void
  contentId: string
  triggerId: string
  triggerRef: RefObject<HTMLDivElement | null>
}

export const [MenuProvider, useMenuContext] = createContext<MenuContextValue>({
  contextName: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: 'MenuProvider',
  strict: false,
  defaultValue: null as unknown as MenuContextValue,
})

export interface RootMenuContextValue {
  close: () => void
}

export const [RootMenuProvider, useRootMenuContext] =
  createContext<RootMenuContextValue>({
    contextName: 'RootMenuContext',
    hookName: 'useRootMenuContext',
    providerName: 'RootMenuProvider',
    strict: true,
    defaultValue: null as unknown as RootMenuContextValue,
  })

export interface MenuRadioItemGroupContextValue<T extends string | number> {
  value?: T
  setValue: (value: T) => void
}

export const [MenuRadioItemGroupProvider, useMenuRadioItemGroupContext] =
  createContext<MenuRadioItemGroupContextValue<string | number>>({
    contextName: 'MenuRadioItemGroupContext',
    hookName: 'useMenuRadioItemGroupContext',
    providerName: 'MenuRadioItemGroupProvider',
    strict: true,
    defaultValue: null as unknown as MenuRadioItemGroupContextValue<
      string | number
    >,
  })

export interface MenuCheckboxItemGroupContextValue<T extends number | string> {
  value: T[]
  setValue: (value: T[]) => void
}

export const [MenuCheckboxItemGroupProvider, useMenuCheckboxItemGroupContext] =
  createContext<MenuCheckboxItemGroupContextValue<number | string>>({
    contextName: 'MenuCheckboxItemGroupContext',
    hookName: 'useMenuCheckboxItemGroupContext',
    providerName: 'MenuCheckboxItemGroupProvider',
    strict: true,
    defaultValue: null as unknown as MenuCheckboxItemGroupContextValue<
      number | string
    >,
  })

export interface MenuItemIndicatorContextValue {
  checked: boolean
}

export const [MenuItemIndicatorProvider, useMenuItemIndicatorContext] =
  createContext<MenuItemIndicatorContextValue>({
    contextName: 'MenuItemIndicatorContext',
    hookName: 'useMenuItemIndicatorContext',
    providerName: 'MenuItemIndicatorProvider',
    strict: true,
    defaultValue: null as unknown as MenuItemIndicatorContextValue,
  })

export interface MenuItemGroupContextValue {
  groupLabelId: string
  registerLabel: () => void
  unregisterLabel: () => void
}

export const [MenuItemGroupProvider, useMenuItemGroupContext] =
  createContext<MenuItemGroupContextValue>({
    contextName: 'MenuItemGroupContext',
    hookName: 'useMenuItemGroupContext',
    providerName: 'MenuItemGroupProvider',
    strict: true,
    defaultValue: null as unknown as MenuItemGroupContextValue,
  })
