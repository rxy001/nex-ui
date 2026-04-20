import { createCollection } from '../collection'

export interface ListNavigationItemData {
  id: string
  textValue: string
  disabled?: boolean
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<ListNavigationItemData>('ListNavigation')
