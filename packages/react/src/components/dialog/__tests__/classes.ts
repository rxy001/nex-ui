import { generateSlotClasses } from '../../utils'

export const dialogClasses = generateSlotClasses('nui-dialog', [
  'root',
  'backdrop',
])

export const dialogContentClasses = generateSlotClasses('nui-dialog-content', [
  'root',
  'paper',
  'closeButton',
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
