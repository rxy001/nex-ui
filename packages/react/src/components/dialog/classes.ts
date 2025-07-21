import { generateUtilityClasses } from '../utils'

export const dialogClasses = generateUtilityClasses('nui-dialog', [
  // ---------root---------
  'root',
  'open',
  'placement-top',
  'placement-bottom',
  'placement-center',
  'scroll-inside',
  'scroll-outside',
  'max-width-xs',
  'max-width-sm',
  'max-width-md',
  'max-width-lg',
  'max-width-xl',
  'max-width-full',
  'full-screen',

  // ---------root---------

  'backdrop',
  'panel',

  'content',
  'close-button',

  'header',
  'body',
  'footer',
])

export const dialogContentClasses = generateUtilityClasses(
  'nui-dialog-content',
  ['root'],
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
