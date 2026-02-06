'use client'

import { createContext } from '@nex-ui/utils'

export interface RovingFocusContextValue {
  onItemFocus: (id: string | number) => void
  onItemBlur: () => void
  focusItemId: string | number
  onFocusableItemMount: () => void
  onFocusableItemUnmount: () => void
}

export const [RovingFocusProvider, useRovingFocusContext] =
  createContext<RovingFocusContextValue | null>({
    contextName: 'RovingFocusContext',
    hookName: 'useRovingFocusContext',
    providerName: 'RovingFocusProvider',
    strict: false,
    defaultValue: null,
  })
