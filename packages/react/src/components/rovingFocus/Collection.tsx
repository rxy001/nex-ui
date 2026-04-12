import { createCollection } from '../collection'

export interface RovingFocusItemData {
  id?: string | number
  focusable?: boolean
  active?: boolean
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<RovingFocusItemData>('RovingFocus')
