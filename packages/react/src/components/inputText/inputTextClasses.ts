import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const inputTextClasses = generateUtilityClasses('nui-input-text', [
  // ---------root---------
  'root',
  // "borderless" | "filled" | "outlined"
  'variant-borderless',
  'variant-filled',
  'variant-outlined',

  // "sm" | "md" | "lg" | "full"
  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-full',

  // "blue" | "gray" | "pink" | "purple" | "cyan" | "yellow" | "orange" | "rose" | "green"
  'color-gray',
  'color-green',
  'color-rose',
  'color-yellow',
  'color-blue',
  'color-pink',
  'color-cyan',
  'color-purple',
  'color-orange',

  // "sm" | "md" | "lg"
  'size-sm',
  'size-md',
  'size-lg',

  'disabled',
  'full-width',
  'error',
  // ---------root---------

  'input',
  'clear-btn',
])
