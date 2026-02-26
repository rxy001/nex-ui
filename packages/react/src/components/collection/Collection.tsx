'use client'

import { CollectionProvider } from './CollectionContext'
import type { CollectionProps } from './types'

export const Collection = <ItemData extends {}>({
  children,
  collection,
}: CollectionProps<ItemData>) => {
  return <CollectionProvider value={collection}>{children}</CollectionProvider>
}

Collection.displayName = 'Collection'
