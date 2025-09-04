import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const inputClasses = generateUtilityClasses('nui-input', [
  // ---------root---------
  'root',

  'variant-outlined',
  'variant-faded',
  'variant-underlined',

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

  'label-placement-inside',
  'label-placement-outside',
  'label-placement-float-outside',
  'label-placement-float-inside',

  'disabled',
  'full-width',
  'invalid',

  // ---------root---------

  'input',

  'clear-button',

  'suffix',

  'prefix',

  'label',
])
