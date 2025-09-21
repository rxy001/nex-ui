import { generateSlotClasses } from '../../utils'

// 用于单元测试
export const switchClasses = generateSlotClasses('nui-switch', [
  'root',
  'input',
  'track',
  'thumb',
  'start-icon',
  'end-icon',
  'label',
])

export const switchDataAttrs = {
  'checked-true': ['data-checked', 'true'],
  'checked-false': ['data-checked', 'false'],

  'disabled-true': ['data-disabled', 'true'],
  'disabled-false': ['data-disabled', 'false'],

  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],

  'color-blue': ['data-color', 'blue'],
  'color-red': ['data-color', 'red'],
  'color-green': ['data-color', 'green'],
  'color-yellow': ['data-color', 'yellow'],
  'color-purple': ['data-color', 'purple'],
  'color-gray': ['data-color', 'gray'],
  'color-cyan': ['data-color', 'cyan'],
  'color-pink': ['data-color', 'pink'],
  'color-orange': ['data-color', 'orange'],
} as const
