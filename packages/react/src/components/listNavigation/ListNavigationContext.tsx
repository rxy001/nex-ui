import { createContext } from '@nex-ui/utils'
import type { FocusEvent, PointerEvent } from 'react'

export interface ListNavigationContextValue {
  highlightedId: string
  onItemEnter: (id: string) => void
  onItemLeave: (
    event: FocusEvent<HTMLElement> | PointerEvent<HTMLElement>,
  ) => void
}

export const [ListNavigationProvider, useListNavigationContext] =
  createContext<ListNavigationContextValue>({
    contextName: 'ListNavigationContext',
    hookName: 'useListNavigationContext',
    providerName: 'ListNavigationProvider',
    strict: true,
    defaultValue: null as unknown as ListNavigationContextValue,
  })
