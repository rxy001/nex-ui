import { generateSlotClasses } from '../../utils'

// 用于单元测试
export const inputClasses = generateSlotClasses('nui-input', [
  'root',
  'input',
  'clear-button',
  'suffix',
  'prefix',
  'label',
])

export const inputDataAttrs = {
  'variant-outlined': ['data-variant', 'outlined'],
  'variant-faded': ['data-variant', 'faded'],
  'variant-underlined': ['data-variant', 'underlined'],

  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],

  'radius-none': ['data-radius', 'none'],
  'radius-sm': ['data-radius', 'sm'],
  'radius-md': ['data-radius', 'md'],
  'radius-lg': ['data-radius', 'lg'],
  'radius-full': ['data-radius', 'full'],

  'labelPlacement-inside': ['data-label-placement', 'inside'],
  'labelPlacement-outside': ['data-label-placement', 'outside'],
  'labelPlacement-float-inside': ['data-label-placement', 'float-inside'],
  'labelPlacement-float-outside': ['data-label-placement', 'float-outside'],

  'color-blue': ['data-color', 'blue'],
  'color-red': ['data-color', 'red'],
  'color-green': ['data-color', 'green'],
  'color-yellow': ['data-color', 'yellow'],
  'color-purple': ['data-color', 'purple'],
  'color-gray': ['data-color', 'gray'],
  'color-cyan': ['data-color', 'cyan'],
  'color-pink': ['data-color', 'pink'],
  'color-orange': ['data-color', 'orange'],

  'disabled-true': ['data-disabled', 'true'],
  'disabled-false': ['data-disabled', 'false'],

  'invalid-true': ['data-invalid', 'true'],
  'invalid-false': ['data-invalid', 'false'],

  'fullWidth-true': ['data-full-width', 'true'],
  'fullWidth-false': ['data-full-width', 'false'],

  'clearable-false': ['data-clearable', 'false'],
  'clearable-true': ['data-clearable', 'true'],
} as const
