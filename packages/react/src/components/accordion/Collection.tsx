import { createCollection } from '../collection'

interface AccordionItemData {
  disabled?: boolean
}

export const [Collection, CollectionItem, useCollection] =
  createCollection<AccordionItemData>('Accordion')
