'use client'

import { createContext } from '@nex-ui/utils'
import type { InterItem, Listener } from './types'

export interface CollectionContextValue<ItemData extends {} = {}> {
  context: {
    registerItem: (item: InterItem<ItemData>) => void
    unregisterItem: (item: InterItem<ItemData>) => void
    registerListener: (listener: Listener<ItemData>) => void
    unregisterListener: () => void
  }
  getItems: () => Array<ItemData & { element: HTMLElement }>
}

export const [CollectionProvider, useCollectionContext] =
  createContext<CollectionContextValue<any> | null>({
    contextName: 'CollectionContext',
    hookName: 'useCollectionContext',
    providerName: 'CollectionProvider',
    strict: false,
    defaultValue: null,
  })
