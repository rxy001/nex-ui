import { createCollection } from '../collection'

export interface BreadcrumbItemData {
  id: string
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<BreadcrumbItemData>('Breadcrumb')
