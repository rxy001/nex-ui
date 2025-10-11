import { generateSlotClasses } from '../../utils'

export const dividerClasses = generateSlotClasses('nui-divider', ['root'])

export const dividerDataAttrs = {
  'orientation-horizontal': ['data-orientation', 'horizontal'],
  'orientation-vertical': ['data-orientation', 'vertical'],
} as const
