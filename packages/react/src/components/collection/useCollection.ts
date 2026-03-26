'use client'

import { useRef } from 'react'
import { CollectionStore } from './CollectionStore'

export const useCollection = <ItemData extends {} = {}>() => {
  const storeRef = useRef<CollectionStore<ItemData> | null>(null)

  if (!storeRef.current) {
    storeRef.current = new CollectionStore<ItemData>()
  }

  return storeRef.current as CollectionStore<ItemData>
}
