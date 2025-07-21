import { generateUtilityClasses } from '../utils'

export const avatarClasses = generateUtilityClasses('nui-avatar', [
  'root',

  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-xl',
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

  'outlined',

  'img',
])

export const avatarGroupClasses = generateUtilityClasses('nui-avatar-group', [
  'root',
  'surplus',
])
