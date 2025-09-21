import { generateSlotClasses } from '../../utils'

export const cardClasses = generateSlotClasses('nui-card', ['root'])

export const cardHeaderClasses = generateSlotClasses('nui-card-header', [
  'root',
  'content',
  'title',
  'subtitle',
])

export const cardBodyClasses = generateSlotClasses('nui-card-body', ['root'])

export const cardFooterClasses = generateSlotClasses('nui-card-footer', [
  'root',
])

export const cardActionAreaClasses = generateSlotClasses(
  'nui-card-action-area',
  ['root'],
)

export const cardDataAttrs = {
  'shadow-xs': ['data-shadow', 'xs'],
  'shadow-sm': ['data-shadow', 'sm'],
  'shadow-md': ['data-shadow', 'md'],
  'shadow-lg': ['data-shadow', 'lg'],
  'shadow-xl': ['data-shadow', 'xl'],

  'blurred-true': ['data-blurred', 'true'],
  'blurred-false': ['data-blurred', 'false'],

  'hoverable-true': ['data-hoverable', 'true'],
  'hoverable-false': ['data-hoverable', 'false'],

  'radius-none': ['data-radius', 'none'],
  'radius-sm': ['data-radius', 'sm'],
  'radius-md': ['data-radius', 'md'],
  'radius-lg': ['data-radius', 'lg'],
} as const
