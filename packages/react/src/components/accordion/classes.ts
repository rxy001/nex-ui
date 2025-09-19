import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const accordionClasses = generateUtilityClasses('nui-accordion', [
  'root',
])

export const accordionItemClasses = generateUtilityClasses(
  'nui-accordion-item',
  ['root', 'heading', 'trigger', 'content', 'indicator'],
)
