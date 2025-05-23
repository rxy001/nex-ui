import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const inputClasses = generateUtilityClasses('nui-input', [
  // ---------root---------
  'root',

  'variant-outlined',

  // "sm" | "md" | "lg" | "full"
  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-full',

  // "blue" | "gray" | "pink" | "purple" | "cyan" | "yellow" | "orange" | "red" | "green"
  'color-gray',
  'color-green',
  'color-red',
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
  'invaild',
  // ---------root---------

  'input',
  'clear-btn',
])
