import type { Overwrite } from '../utils'

export interface AliasesOverrides {}

export type Aliases = Overwrite<DefaultAliases, AliasesOverrides>

export interface DefaultAliases {
  bg?: 'backgroundColor'
  fs?: 'fontSize'
  lh?: 'lineHeight'
  w?: 'width'
  h?: 'height'
  py?: ['paddingTop', 'paddingBottom']
  px?: ['paddingLeft', 'paddingRight']
  pt?: 'paddingTop'
  pb?: 'paddingBottom'
  pl?: 'paddingLeft'
  pr?: 'paddingRight'
  p?: 'padding'
  mt?: 'marginTop'
  mb?: 'marginBottom'
  ml?: 'marginLeft'
  mr?: 'marginRight'
  m?: 'margin'
  mx?: ['marginLeft', 'marginRight']
  my?: ['marginTop', 'marginBottom']
}
