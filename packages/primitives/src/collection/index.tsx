import { Collection as Root, useCollection } from './Collection'
import { CollectionItem as Item, useCollectionItem } from './CollectionItem'

const Collection = {
  Root,
  Item,
}

export { Collection, useCollection, useCollectionItem }
export { CollectionProvider, useCollectionContext } from './CollectionContext'
export type {
  UseCollectionProps,
  CollectionState,
  CollectionProps,
} from './Collection'
export type {
  UseCollectionItemProps,
  CollectionItemState,
  CollectionItemProps,
} from './CollectionItem'
