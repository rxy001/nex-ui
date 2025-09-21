import { generateSlotClasses } from '../../utils'

export const avatarSlotClasses = generateSlotClasses('nui-avatar', [
  'root',

  'outlined',

  'img',
])

export const avatarGroupSlotClasses = generateSlotClasses('nui-avatar-group', [
  'root',
  'surplus',
])

export const avatarDataAttrs = {
  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],

  'radius-none': ['data-radius', 'none'],
  'radius-sm': ['data-radius', 'sm'],
  'radius-md': ['data-radius', 'md'],
  'radius-lg': ['data-radius', 'lg'],
  'radius-xl': ['data-radius', 'xl'],
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

  'outlined-true': ['data-outlined', 'true'],
  'outlined-false': ['data-outlined', 'false'],

  'inGroup-true': ['data-in-group', 'true'],
  'inGroup-false': ['data-in-group', 'false'],
} as const
