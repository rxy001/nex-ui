import { generateSlotClasses } from '../../utils'

// 用于单元测试
export const dividerClasses = generateSlotClasses('nui-divider', ['root'])

export const dividerDataAttrs = {
  'orientation-horizontal': ['data-orientation', 'horizontal'],
  'orientation-vertical': ['data-orientation', 'vertical'],
} as const
