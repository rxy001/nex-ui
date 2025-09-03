import { generateUtilityClasses } from '../utils'

export const cardClasses = generateUtilityClasses('nui-card', [
  'root',
  'blurred',
  'hoverable',

  'shadow-xs',
  'shadow-sm',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',

  'radius-none',
  'radius-sm',
  'radius-md',
  'radius-lg',
])

export const cardHeaderClasses = generateUtilityClasses('nui-card-header', [
  'root',
  'content',
  'title',
  'subtitle',
])

export const cardBodyClasses = generateUtilityClasses('nui-card-body', ['root'])

export const cardFooterClasses = generateUtilityClasses('nui-card-footer', [
  'root',
])

export const cardActionAreaClasses = generateUtilityClasses(
  'nui-card-action-area',
  ['root'],
)
