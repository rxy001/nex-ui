import { createContext } from '@nex-ui/utils'
import type { RefObject, PointerEvent } from 'react'
import type { Side } from '../utils'

export interface MenuContextValue {
  open?: boolean
  setOpen: (open: boolean) => void
  contentId: string
  triggerId: string
  triggerRef: RefObject<HTMLElement | null>
}

export const [MenuProvider, useMenuContext] = createContext<MenuContextValue>({
  contextName: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: 'MenuProvider',
  strict: false,
  defaultValue: null as unknown as MenuContextValue,
})

export interface RootMenuContextValue {
  usingKeyboardRef: RefObject<boolean>
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

export interface SubMenuContextValue {
  menuRootRef: RefObject<HTMLDivElement | null>
}

export const [SubMenuProvider, useSubMenuContext] =
  createContext<SubMenuContextValue>({
    contextName: 'SubMenuContext',
    hookName: 'useSubMenuContext',
    providerName: 'SubMenuProvider',
    strict: false,
    defaultValue: null as unknown as SubMenuContextValue,
  })

export interface MenuRadioItemGroupContextValue<T extends string | number> {
  value: T
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

export interface GraceIntent {
  area: {
    top: number
    bottom: number
    left: number
    right: number
  }
  side: Side
}

export interface MenuContentContextValue {
  onItemEnter: (event: PointerEvent<HTMLElement>) => void
  onItemLeave: (event: PointerEvent<HTMLElement>) => void
  onPointerGraceIntentChange(intent: GraceIntent | null): void
}

export const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>({
    contextName: 'MenuContentContext',
    hookName: 'useMenuContentContext',
    providerName: 'MenuContentProvider',
    strict: true,
    defaultValue: null as unknown as MenuContentContextValue,
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
