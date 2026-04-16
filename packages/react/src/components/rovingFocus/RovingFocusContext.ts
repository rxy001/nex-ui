'use client'

import { createContext } from '@nex-ui/utils'

export interface RovingFocusContextValue {
  onItemFocus: (id: string) => void
  focusItemId: string
  firstItemId: string
}

export const [RovingFocusProvider, useRovingFocusContext] =
  createContext<RovingFocusContextValue>({
    contextName: 'RovingFocusContext',
    hookName: 'useRovingFocusContext',
    providerName: 'RovingFocusProvider',
    strict: true,
    defaultValue: null as unknown as RovingFocusContextValue,
  })
