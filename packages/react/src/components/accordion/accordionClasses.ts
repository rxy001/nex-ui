import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const accordionClasses = generateUtilityClasses('nui-accordion', [
  // ---------root---------
  'root',

  // "underlined" | "outlined"
  'variant-underlined',
  'variant-outlined',
])

export const accordionItemClasses = generateUtilityClasses(
  'nui-accordion-item',
  [
    // ---------root---------
    'root',
    'disabled',

    // ---------heading---------
    'heading',

    // ---------trigger---------
    'trigger',

    // ---------content---------
    'content',

    // ---------indicator---------
    'indicator',

    'expanded',
  ],
)
