import { generateSlotClasses } from '../../utils'

// 用于单元测试
export const alertSlotClasses = generateSlotClasses('nui-alert', [
  'root',
  'icon',
  'content',
  'title',
  'description',
  'close-button',
])

export const alertDataAttrs = {
  'status-info': ['data-status', 'info'],
  'status-success': ['data-status', 'success'],
  'status-warning': ['data-status', 'warning'],
  'status-error': ['data-status', 'error'],

  'variant-solid': ['data-variant', 'solid'],
  'variant-subtle': ['data-variant', 'subtle'],
  'variant-faded': ['data-variant', 'faded'],
  'variant-outlined': ['data-variant', 'outlined'],

  'radius-none': ['data-radius', 'none'],
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
} as const
