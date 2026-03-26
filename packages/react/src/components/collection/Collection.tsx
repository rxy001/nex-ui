'use client'

import { useEvent } from '@nex-ui/hooks'
import { useEffect } from 'react'
import { CollectionProvider } from './CollectionContext'
import type { CollectionContextValue } from './CollectionContext'
import type { CollectionProps } from './types'
import type { CollectionItemData } from './CollectionStore'

export function Collection<ItemData extends {}>({
  children,
  collection,
  onItemsChange,
}: CollectionProps<ItemData>) {
  const innerCollection = collection as CollectionContextValue<ItemData>

  const listener = useEvent((items: CollectionItemData<ItemData>[]) => {
    onItemsChange?.(items)
  })

  useEffect(() => {
    innerCollection.registerListener(listener)

    return innerCollection.unregisterListener
  }, [innerCollection, listener])

  return (
    <CollectionProvider value={innerCollection}>{children}</CollectionProvider>
  )
}

Collection.displayName = 'Collection'
