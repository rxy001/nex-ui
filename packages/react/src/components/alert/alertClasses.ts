import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const alertClasses = generateUtilityClasses('nui-alert', [
  // ---------root---------
  'root',

  'variant-faded',
  'variant-outlined',
  'variant-solid',
  'variant-subtle',

  'color-gray',
  'color-green',
  'color-red',
  'color-yellow',
  'color-blue',
  'color-pink',
  'color-cyan',
  'color-purple',
  'color-orange',

  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-full',
  'radius-none',

  'status-info',
  'status-success',
  'status-warning',
  'status-error',

  'icon',
  'content',
  'title',
  'description',
  'close-button',
])
