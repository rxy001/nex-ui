import type { ReactElement, ReactNode, Ref, RefObject } from 'react'
import type { CollectionItemData, Listener } from './CollectionStore'

export type Item<ItemData extends {} = {}> = RefObject<
  {
    element: RefObject<HTMLElement | null>
  } & ItemData
>

export interface CollectionStore<ItemData extends {} = {}> {
  getItems: () => Array<CollectionItemData<ItemData>>
}

export interface CollectionProps<ItemData extends {} = {}> {
  children?: ReactNode
  collection: CollectionStore<ItemData>
  // onItemsChange is only fired when the length of the items array changes,
  // not on every item data mutation.
  onItemsChange?: Listener<ItemData>
}

export type CollectionItemProps<ItemData extends {} = {}> = ItemData & {
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
