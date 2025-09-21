import { generateSlotClasses } from '../../utils'

export const drawerClasses = generateSlotClasses('nui-drawer', [
  'root',
  'backdrop',
])

export const drawerContentClasses = generateSlotClasses('nui-drawer-content', [
  'root',
  'paper',
  'close-button',
])

export const drawerHeaderClasses = generateSlotClasses('nui-drawer-header', [
  'root',
])

export const drawerFooterClasses = generateSlotClasses('nui-drawer-footer', [
  'root',
])

export const drawerBodyClasses = generateSlotClasses('nui-drawer-body', [
  'root',
])

export const drawerDataAttrs = {
  'open-true': ['data-state', 'open'],
  'open-false': ['data-state', 'closed'],
} as const

export const drawerContentDataAttrs = {
  'size-xs': ['data-size', 'xs'],
  'size-sm': ['data-size', 'sm'],
  'size-md': ['data-size', 'md'],
  'size-lg': ['data-size', 'lg'],
  'size-xl': ['data-size', 'xl'],
  'size-full': ['data-size', 'full'],

  'placement-top': ['data-placement', 'top'],
  'placement-right': ['data-placement', 'right'],
  'placement-left': ['data-placement', 'left'],
  'placement-bottom': ['data-placement', 'bottom'],

  'hideCloseButton-true': ['data-hide-close-button', 'true'],
  'hideCloseButton-false': ['data-hide-close-button', 'false'],
} as const
