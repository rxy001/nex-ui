import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const radioClasses = generateUtilityClasses('nui-radio', [
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

  'checked',
  'disabled',
  // ---------root---------

  'input',
  'label',
  'dot',
])

export const radioGroupClasses = generateUtilityClasses('nui-radio-group', [
  'root',
  'label',
  'wrapper',
  'orientation-vertical',
  'orientation-horizontal',
])
