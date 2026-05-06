import { useEvent } from '@nex-ui/hooks'
import { useState } from 'react'
import type { Directory } from '../utils/types'

export type CollectionStoreItem<T extends Directory = Directory> = T & {
  id: string
  element: React.RefObject<HTMLElement | null>
}

export interface CollectionStore<ItemData extends Directory = Directory> {
  items: CollectionStoreItem<ItemData>[]
  addItem: (item: CollectionStoreItem<ItemData>) => void
  removeItem: (id: string) => void
}

export const useCollectionStore = <
  ItemData extends Directory = Directory,
>(): CollectionStore<ItemData> => {
  const [items, setItems] = useState<CollectionStoreItem<ItemData>[]>([])

  const addItem = useEvent((item: CollectionStoreItem<ItemData>) => {
    setItems((prevItems) => [...prevItems, item])
  })

  const removeItem = useEvent((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  })

  return {
    items,
    addItem,
    removeItem,
  }
}
