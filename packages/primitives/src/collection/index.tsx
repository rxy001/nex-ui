import { CollectionRoot, useCollectionRoot } from './CollectionRoot'
import { CollectionItem, useCollectionItem } from './CollectionItem'

const Collection = {
  Root: CollectionRoot,
  Item: CollectionItem,
}

export {
  Collection,
  CollectionRoot,
  CollectionItem,
  useCollectionRoot,
  useCollectionItem,
}

export {
  CollectionRootProvider,
  useCollectionRootContext,
} from './CollectionContext'
export type {
  UseCollectionRootProps,
  CollectionRootState,
  CollectionRootProps,
} from './CollectionRoot'
export type {
  UseCollectionItemProps,
  CollectionItemState,
  CollectionItemProps,
} from './CollectionItem'
