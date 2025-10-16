import { generateSlotClasses } from '../../utils'

export const accordionSlotClasses = generateSlotClasses('nui-accordion', [
  'root',
])

export const accordionItemSlotClasses = generateSlotClasses(
  'nui-accordion-item',
  ['root', 'heading', 'trigger', 'content', 'indicator'],
)
