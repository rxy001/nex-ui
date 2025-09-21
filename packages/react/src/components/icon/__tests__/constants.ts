import { generateSlotClasses } from '../../utils'

export const iconClasses = generateSlotClasses('nui-icon', ['root'])

export const iconDataAttrs = {
  'spin-true': ['data-spin', 'true'],
  'spin-false': ['data-spin', 'false'],

  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],
} as const
