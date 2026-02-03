import type { ReactElement, ReactNode, Ref } from 'react'
import type { CollectionContextValue } from './CollectionContext'

export interface CollectionProps<ItemData extends {} = {}> {
  children?: ReactNode
  context: CollectionContextValue<ItemData>
}

export type CollectionItemProps<ItemData extends {} = {}> = ItemData & {
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
