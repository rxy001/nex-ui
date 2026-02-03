'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

export type Item<ItemData extends {} = {}> = RefObject<
  {
    element: RefObject<HTMLElement | null>
  } & ItemData
>

export interface CollectionContextValue<ItemData extends {} = {}> {
  register: (item: Item<ItemData>) => void
  unregister: (item: Item<ItemData>) => void
}

export const [CollectionProvider, useCollectionContext] = createContext<
  CollectionContextValue<any>
>({
  contextName: 'CollectionContext',
  hookName: 'useCollectionContext',
  providerName: 'CollectionProvider',
  strict: true,
  defaultValue: null as unknown as CollectionContextValue,
})
