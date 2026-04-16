import { createCollection } from '../collection'

export interface RovingFocusItemData {
  id?: string
  focusable?: boolean
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<RovingFocusItemData>('RovingFocus')
