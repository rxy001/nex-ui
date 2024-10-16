import { defineConfig } from '@nex-ui/system'

export const aliases = defineConfig.aliases({
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
})
