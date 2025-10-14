import { generateSlotClasses } from '../../utils'

export const radioClasses = generateSlotClasses('nui-radio', [
  'root',
  'input',
  'label',
  'dot',
])

export const radioGroupClasses = generateSlotClasses('nui-radio-group', [
  'root',
  'label',
  'wrapper',
])

export const radioDataAttrs = {
  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],

  'checked-true': ['data-checked', 'true'],
  'checked-false': ['data-checked', 'false'],

  'disabled-true': ['data-disabled', 'true'],
  'disabled-false': ['data-disabled', 'false'],

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

export const radioGroupDataAttrs = {
  'orientation-horizontal': ['data-orientation', 'horizontal'],
  'orientation-vertical': ['data-orientation', 'vertical'],
} as const
