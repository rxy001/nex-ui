import type { ReactElement, ReactNode, Ref, RefObject } from 'react'
import type { CollectionContextValue } from './CollectionContext'

export type Item<ItemData extends {} = {}> = RefObject<
  {
    element: RefObject<HTMLElement | null>
  } & ItemData
>

export interface CollectionProps<ItemData extends {} = {}> {
  children?: ReactNode
  collection: CollectionContextValue<ItemData>
}

export type CollectionItemProps<ItemData extends {} = {}> = ItemData & {
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
