import { generateUtilityClasses } from '../utils'

export const drawerClasses = generateUtilityClasses('nui-drawer', [
  'root',
  'open',
  'backdrop',
])

export const drawerContentClasses = generateUtilityClasses(
  'nui-drawer-content',
  [
    'root',

    'placement-top',
    'placement-right',
    'placement-bottom',
    'placement-left',

    'size-xs',
    'size-sm',
    'size-md',
    'size-lg',
    'size-xl',
    'size-full',

    'paper',
    'close-button',
  ],
)

export const drawerHeaderClasses = generateUtilityClasses('nui-drawer-header', [
  'root',
])

export const drawerFooterClasses = generateUtilityClasses('nui-drawer-footer', [
  'root',
])

export const drawerBodyClasses = generateUtilityClasses('nui-drawer-body', [
  'root',
])
