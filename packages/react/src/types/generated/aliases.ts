import type { Overwrite } from '../utils'

export interface AliasesOverrides {}

export type Aliases = Overwrite<DefaultAliases, AliasesOverrides>

export interface DefaultAliases {
  bg?: 'backgroundColor'
  fs?: 'fontSize'
  lh?: 'lineHeight'
  w?: 'width'
  h?: 'height'
  p?: 'padding'
  pt?: 'paddingBlockStart'
  pb?: 'paddingBlockEnd'
  pl?: 'paddingInlineStart'
  pr?: 'paddingInlineEnd'
  px?: ['paddingInlineStart', 'paddingInlineEnd']
  py?: ['paddingBlockStart', 'paddingBlockEnd']
  m?: 'margin'
  mt?: 'marginBlockStart'
  mb?: 'marginBlockEnd'
  ml?: 'marginInlineStart'
  mr?: 'marginInlineEnd'
  mx?: ['marginInlineStart', 'marginInlineEnd']
  my?: ['marginBlockStart', 'marginBlockEnd']
}
