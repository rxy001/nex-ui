'use client'

import { useEvent } from '@nex-ui/hooks'
import { useEffect } from 'react'
import { CollectionProvider } from './CollectionContext'
import type { CollectionItemData, CollectionProps } from './types'

export const Collection = <ItemData extends {}>({
  children,
  collection,
  onItemsChange,
}: CollectionProps<ItemData>) => {
  const listener = useEvent((items: CollectionItemData<ItemData>[]) => {
    onItemsChange?.(items)
  })

  useEffect(() => {
    collection.context.registerListener(listener)

    return collection.context.unregisterListener
  }, [collection.context, listener])

  return <CollectionProvider value={collection}>{children}</CollectionProvider>
}

Collection.displayName = 'Collection'
