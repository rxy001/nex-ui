import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const switchClasses = generateUtilityClasses('nui-switch', [
  // ---------root---------
  'root',

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
  'checked',
  // ---------root---------

  'input',
  'track',
  'thumb',
  'start-icon',
  'end-icon',
  'label',
])
