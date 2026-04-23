import type {
  Listener,
  CollectionStore as InternalCollectionStore,
} from './CollectionStore'
import type { ReactElement, ReactNode, Ref } from 'react'

export interface CollectionProps<ItemData extends {} = {}> {
  children?: ReactNode
  collection: CollectionStore<ItemData>
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
