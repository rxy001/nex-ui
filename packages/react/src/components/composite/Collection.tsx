import { createCollection } from '../collection'

export interface CompositeItemData {
  id: string
  disabled?: boolean
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<CompositeItemData>('Composite')
