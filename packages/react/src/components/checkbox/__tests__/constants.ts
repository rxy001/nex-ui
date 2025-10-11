import { generateSlotClasses } from '../../utils'

export const checkboxClasses = generateSlotClasses('nui-checkbox', [
  'root',
  'input',
  'label',
  'icon',
])

export const checkboxGroupClasses = generateSlotClasses('nui-checkbox-group', [
  'root',
  'label',
  'wrapper',
])

export const checkboxDataAttrs = {
  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],

  'radius-sm': ['data-radius', 'sm'],
  'radius-md': ['data-radius', 'md'],
  'radius-lg': ['data-radius', 'lg'],
  'radius-full': ['data-radius', 'full'],

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

  'indeterminate-true': ['data-indeterminate', 'true'],
  'indeterminate-false': ['data-indeterminate', 'false'],

  'checked-true': ['data-checked', 'true'],
  'checked-false': ['data-checked', 'false'],

  'inGroup-true': ['data-in-group', 'true'],
  'inGroup-false': ['data-in-group', 'false'],
} as const

export const checkboxGroupDataAttrs = {
  'orientation-vertical': ['data-orientation', 'vertical'],
  'orientation-horizontal': ['data-orientation', 'horizontal'],
} as const
