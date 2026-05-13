import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'
import type { ListNavigationProps } from './types'

export interface ListNavigationContextValue {
  highlightedId: string
  loop: boolean
  orientation: Exclude<ListNavigationProps['orientation'], undefined>
  setHighlightedId: (id: string) => void
  contentRef: RefObject<HTMLElement | null>
}

export const [ListNavigationProvider, useListNavigationContext] =
  createContext<ListNavigationContextValue | null>({
    contextName: 'ListNavigationContext',
    hookName: 'useListNavigationContext',
    providerName: 'ListNavigationProvider',
    strict: false,
    defaultValue: null,
  })

export interface ListNavigationRootContextValue {
  keyRef: RefObject<string | null>
  listRef: RefObject<HTMLElement | null>
}

export const [ListNavigationRootProvider, useListNavigationRootContext] =
  createContext<ListNavigationRootContextValue>({
    contextName: 'ListNavigationRootContext',
    hookName: 'useListNavigationRootContext',
    providerName: 'ListNavigationRootProvider',
    strict: false,
    defaultValue: {} as ListNavigationRootContextValue,
  })
