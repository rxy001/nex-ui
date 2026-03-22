import type { ReactElement, ReactNode, Ref, RefObject } from 'react'
import type { CollectionContextValue } from './CollectionContext'

export type CollectionItemData<ItemData extends {} = {}> = {
  element: HTMLElement | null
} & ItemData

export type InterItem<ItemData extends {} = {}> = RefObject<
  {
    element: RefObject<HTMLElement | null>
  } & ItemData
>

export interface Listener<ItemData extends {} = {}> {
  (items: Array<CollectionItemData<ItemData>>): void
}

export interface CollectionProps<ItemData extends {} = {}> {
  children?: ReactNode
  collection: CollectionContextValue<ItemData>
  // onItemsChange is only fired when the length of the items array changes,
  // not on every item data mutation.
  onItemsChange?: Listener<ItemData>
}

export type CollectionItemProps<ItemData extends {} = {}> = ItemData & {
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
