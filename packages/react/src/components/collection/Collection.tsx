'use client'

import { CollectionProvider } from './CollectionContext'
import type { CollectionProps } from './types'

export const Collection = <ItemData extends {}>({
  children,
  context,
}: CollectionProps<ItemData>) => {
  return <CollectionProvider value={context}>{children}</CollectionProvider>
}

Collection.displayName = 'Collection'
