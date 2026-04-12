import { createCollection } from '../collection'

export interface MenuItemData {
  textValue: string
  disabled?: boolean
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<MenuItemData>('MenuContent')
