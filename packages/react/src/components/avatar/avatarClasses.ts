import { generateUtilityClasses } from '../utils'

export const avatarClasses = generateUtilityClasses('nui-avatar', [
  'root',
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

  'img',
])
