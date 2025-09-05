import { defineConfig } from '@nex-ui/system'

export const aliases = defineConfig.aliases({
  bg: 'backgroundColor',

  fs: 'fontSize',
  lh: 'lineHeight',

  w: 'width',
  h: 'height',
  size: ['width', 'height'],

  maxW: 'maxWidth',
  minW: 'minWidth',
  maxH: 'maxHeight',
  minH: 'minHeight',

  pos: 'position',

  d: 'display',

  p: 'padding',
  pt: 'paddingBlockStart',
  pb: 'paddingBlockEnd',
  pl: 'paddingInlineStart',
  pr: 'paddingInlineEnd',
  px: ['paddingInlineStart', 'paddingInlineEnd'],
  py: ['paddingBlockStart', 'paddingBlockEnd'],

  m: 'margin',
  mt: 'marginBlockStart',
  mb: 'marginBlockEnd',
  ml: 'marginInlineStart',
  mr: 'marginInlineEnd',
  mx: ['marginInlineStart', 'marginInlineEnd'],
  my: ['marginBlockStart', 'marginBlockEnd'],
})
