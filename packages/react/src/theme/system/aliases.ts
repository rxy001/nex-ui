import { defineConfig } from '@nex-ui/system'

export const aliases = defineConfig.aliases({
  bg: 'backgroundColor',
  fs: 'fontSize',
  lh: 'lineHeight',
  w: 'width',
  h: 'height',

  // padding
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingInline',
  py: 'paddingBlock',

  // margin
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginInline',
  my: 'marginBlock',
})
