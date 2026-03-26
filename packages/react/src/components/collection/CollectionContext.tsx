'use client'

import { createContext } from '@nex-ui/utils'
import type { CollectionStore } from './CollectionStore'

export interface CollectionContextValue<ItemData extends {} = {}>
  extends CollectionStore<ItemData> {}

export const [CollectionProvider, useCollectionContext] =
  createContext<CollectionContextValue<any> | null>({
    contextName: 'CollectionContext',
    hookName: 'useCollectionContext',
    providerName: 'CollectionProvider',
    strict: false,
    defaultValue: null,
  })
