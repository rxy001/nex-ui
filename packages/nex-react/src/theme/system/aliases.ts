import { defineConfig } from '@nex-ui/system'

export const aliases = defineConfig.aliases({
  /** compound selectors */
  hover: '&:not(:disabled):not([data-disabled=true]):hover',
  active: '&:not(:disabled):not([data-disabled=true]):active',
  disabled: ':disabled, &[data-disabled=true]',
  /** compound selectors */

  /** aliases */
  bg: 'backgroundColor',
  fs: 'fontSize',
  lh: 'lineHeight',
  w: 'width',
  h: 'height',

  // padding
  py: ['paddingTop', 'paddingBottom'],
  px: ['paddingLeft', 'paddingRight'],
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  p: 'padding',

  // margin
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  m: 'margin',
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  /** aliases */
})
