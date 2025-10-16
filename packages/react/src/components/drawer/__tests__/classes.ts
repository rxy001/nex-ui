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
