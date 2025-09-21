import { generateSlotClasses } from '../../utils'

export const accordionSlotClasses = generateSlotClasses('nui-accordion', [
  'root',
])

export const accordionItemSlotClasses = generateSlotClasses(
  'nui-accordion-item',
  ['root', 'heading', 'trigger', 'content', 'indicator'],
)

export const accordionDataAttrs = {
  'variant-outlined': ['data-variant', 'outlined'],
  'variant-underlined': ['data-variant', 'underlined'],

  'multiple-true': ['data-multiple', 'true'],
  'multiple-false': ['data-multiple', 'false'],
} as const

export const accordionItemDataAttrs = {
  'state-expanded': ['data-state', 'expanded'],
  'state-collapsed': ['data-state', 'collapsed'],

  'disabled-true': ['data-disabled', 'true'],
  'disabled-false': ['data-disabled', 'false'],

  'hideIndicator-true': ['data-hide-indicator', 'true'],
  'hideIndicator-false': ['data-hide-indicator', 'false'],

  'keepMounted-true': ['data-keep-mounted', 'true'],
  'keepMounted-false': ['data-keep-mounted', 'false'],
} as const
