import { generateUtilityClasses } from '../utils'

export const dialogClasses = generateUtilityClasses('nui-dialog', [
  'root',
  'open',
  'backdrop',
])

export const dialogContentClasses = generateUtilityClasses(
  'nui-dialog-content',
  [
    'root',

    'size-xs',
    'size-sm',
    'size-md',
    'size-lg',
    'size-xl',
    'size-full',

    'full-screen',

    'placement-top',
    'placement-bottom',
    'placement-center',

    'scroll-inside',
    'scroll-outside',

    'paper',
    'close-button',
  ],
)

export const dialogHeaderClasses = generateUtilityClasses('nui-dialog-header', [
  'root',
])

export const dialogFooterClasses = generateUtilityClasses('nui-dialog-footer', [
  'root',
])

export const dialogBodyClasses = generateUtilityClasses('nui-dialog-body', [
  'root',
])
