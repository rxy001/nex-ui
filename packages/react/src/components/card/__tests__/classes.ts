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
