import { createCollection } from '../collection'

export interface RadioItemData {
  id: string
  disabled?: boolean
}

export const [Collection, CollectionItem, useCollection, useCollectionContext] =
  createCollection<RadioItemData>('RadioContent')
