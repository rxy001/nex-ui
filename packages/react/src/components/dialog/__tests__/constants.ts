import { generateSlotClasses } from '../../utils'

export const dialogClasses = generateSlotClasses('nui-dialog', [
  'root',
  'backdrop',
])

export const dialogContentClasses = generateSlotClasses('nui-dialog-content', [
  'root',
  'paper',
  'close-button',
])

export const dialogHeaderClasses = generateSlotClasses('nui-dialog-header', [
  'root',
])

export const dialogFooterClasses = generateSlotClasses('nui-dialog-footer', [
  'root',
])

export const dialogBodyClasses = generateSlotClasses('nui-dialog-body', [
  'root',
])

export const dialogDataAttrs = {
  'open-true': ['data-state', 'open'],
  'open-false': ['data-state', 'closed'],

  'hideBackdrop-true': ['data-hide-backdrop', 'true'],
  'hideBackdrop-false': ['data-hide-backdrop', 'false'],
} as const

export const dialogContentDataAttrs = {
  'size-xs': ['data-size', 'xs'],
  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],
  'size-xl': ['data-size', 'xl'],
  'size-full': ['data-size', 'full'],

  'placement-top': ['data-placement', 'top'],
  'placement-center': ['data-placement', 'center'],
  'placement-bottom': ['data-placement', 'bottom'],

  'scroll-inside': ['data-scroll', 'inside'],
  'scroll-outside': ['data-scroll', 'outside'],

  'fullScreen-true': ['data-full-screen', 'true'],
  'fullScreen-false': ['data-full-screen', 'false'],

  'hideCloseButton-true': ['data-hide-close-button', 'true'],
  'hideCloseButton-false': ['data-hide-close-button', 'false'],
} as const
