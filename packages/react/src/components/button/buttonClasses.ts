import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const buttonClasses = generateUtilityClasses('nui-btn', [
  // ---------root---------
  'root',
  // "text" | "solid" | "outlined"
  'variant-text',
  'variant-solid',
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

  'icon-only',
  'loading',
  'disabled',
  'full-width',
  'disable-ripple',
  // ---------root---------

  'icon',
  'start-icon',
  'end-icon',
  'icon-loading',
])
