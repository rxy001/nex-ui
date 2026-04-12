import type {
  Listener,
  CollectionStore as InternalCollectionStore,
} from './CollectionStore'
import type { ReactElement, ReactNode, Ref } from 'react'

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

export interface CollectionContextValue<ItemData extends {} = {}>
  extends InternalCollectionStore<ItemData> {}

export interface CollectionStore<ItemData extends {} = {}> {
  getItems: InternalCollectionStore<ItemData>['getItems']
}
