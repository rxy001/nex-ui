'use client'

import { createContext } from '@nex-ui/utils'
import type { Item } from './types'

export interface CollectionContextValue<ItemData extends {} = {}> {
  context: {
    register: (item: Item<ItemData>) => void
    unregister: (item: Item<ItemData>) => void
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
