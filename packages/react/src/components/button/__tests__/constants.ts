import { generateSlotClasses } from '../../utils'

// 用于单元测试
export const buttonSlotClasses = generateSlotClasses('nui-button', [
  'root',
  'start-icon',
  'end-icon',
])

export const buttonDataAttrs = {
  'loading-true': ['data-loading', 'true'],
  'loading-false': ['data-loading', 'false'],

  'variant-solid': ['data-variant', 'solid'],
  'variant-outlined': ['data-variant', 'outlined'],
  'variant-ghost': ['data-variant', 'ghost'],
  'variant-faded': ['data-variant', 'faded'],

  'radius-none': ['data-radius', 'none'],
  'radius-sm': ['data-radius', 'sm'],
  'radius-md': ['data-radius', 'md'],
  'radius-lg': ['data-radius', 'lg'],
  'radius-full': ['data-radius', 'full'],

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

  'iconOnly-true': ['data-icon-only', 'true'],
  'iconOnly-false': ['data-icon-only', 'false'],

  'fullWidth-true': ['data-full-width', 'true'],
  'fullWidth-false': ['data-full-width', 'false'],

  'disableRipple-true': ['data-disable-ripple', 'true'],
  'disableRipple-false': ['data-disable-ripple', 'false'],

  'disabled-true': ['data-disabled', 'true'],
  'disabled-false': ['data-disabled', 'false'],
} as const
