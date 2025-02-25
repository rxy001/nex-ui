import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const checkboxClasses = generateUtilityClasses('nui-checkbox', [
  // ---------root---------
  'root',

  // "sm" | "md" | "lg" | "full" | "none"
  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-full',
  'radius-none',

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

  'checked',
  'disabled',
  // ---------root---------

  'input',
  'label',
  'icon',
  'iconContainer',
])
