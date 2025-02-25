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
  pt?: 'paddingTop'
  pb?: 'paddingBottom'
  pl?: 'paddingLeft'
  pr?: 'paddingRight'
  px?: ['paddingLeft', 'paddingRight']
  py?: ['paddingTop', 'paddingBottom']
  m?: 'margin'
  mt?: 'marginTop'
  mb?: 'marginBottom'
  ml?: 'marginLeft'
  mr?: 'marginRight'
  mx?: ['marginLeft', 'marginRight']
  my?: ['marginTop', 'marginBottom']
}
