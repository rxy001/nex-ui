import type { RawCSSProperties, CSSInterpolation } from '@nex-ui/system'
import type { Tokens } from './tokens'
import type { SemanticTokens } from './semanticTokens'
import type { Breakpoints } from './breakpoints'

type ResponsiveColor<T> = {
  _DEFAULT?: T
  _dark?: T
  _light?: T
}

type BreakpointObject<T> = {
  [key in keyof Breakpoints as `_${key}`]: T
}

type BreakpointArray = (string | number)[]

type TransformColors<T> = T extends `${string}.${infer U}`
  ? `colorPalette.${U}`
  : 'colorPalette'

type VirtualColors =
  | TransformColors<Tokens['colors']>
  | TransformColors<SemanticTokens['colors']>

interface CSSProperties extends RawCSSProperties {
  _hover?: CSSInterpolation
  _active?: CSSInterpolation
  _disabled?: CSSInterpolation
  _dark?: CSSInterpolation
  _light?: CSSInterpolation
  color?:
    | RawCSSProperties['color']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderColor?:
    | RawCSSProperties['borderColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  backgroundColor?:
    | RawCSSProperties['backgroundColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  fontSize?: RawCSSProperties['fontSize'] | Tokens['fontSizes']
  borderWidth?: RawCSSProperties['borderWidth'] | Tokens['borders']
  width?: RawCSSProperties['width'] | Tokens['sizes']
  height?: RawCSSProperties['height'] | Tokens['sizes']
  lineHeight?: RawCSSProperties['lineHeight'] | Tokens['lineHeights']
  padding?:
    | RawCSSProperties['padding']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  paddingTop?:
    | RawCSSProperties['paddingTop']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  paddingBottom?:
    | RawCSSProperties['paddingBottom']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  paddingLeft?:
    | RawCSSProperties['paddingLeft']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  paddingRight?:
    | RawCSSProperties['paddingRight']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  marginRight?:
    | RawCSSProperties['marginRight']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  marginTop?:
    | RawCSSProperties['marginTop']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  marginLeft?:
    | RawCSSProperties['marginLeft']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  marginBottom?:
    | RawCSSProperties['marginBottom']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  margin?:
    | RawCSSProperties['margin']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  borderRadius?: RawCSSProperties['borderRadius'] | Tokens['radii']
  borderTopRightRadius?:
    | RawCSSProperties['borderTopRightRadius']
    | Tokens['radii']
  borderTopLeftRadius?:
    | RawCSSProperties['borderTopLeftRadius']
    | Tokens['radii']
  borderBottomRightRadius?:
    | RawCSSProperties['borderBottomRightRadius']
    | Tokens['radii']
  borderBottomLeftRadius?:
    | RawCSSProperties['borderBottomLeftRadius']
    | Tokens['radii']
  fontFamily?: RawCSSProperties['fontFamily'] | Tokens['fontFamilies']
  bg?:
    | RawCSSProperties['backgroundColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  fs?: RawCSSProperties['fontSize'] | Tokens['fontSizes']
  lh?: RawCSSProperties['lineHeight'] | Tokens['lineHeights']
  w?: RawCSSProperties['width'] | Tokens['sizes']
  h?: RawCSSProperties['height'] | Tokens['sizes']
  py?:
    | RawCSSProperties['paddingTop']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  px?:
    | RawCSSProperties['paddingLeft']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  pt?:
    | RawCSSProperties['paddingTop']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  pb?:
    | RawCSSProperties['paddingBottom']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  pl?:
    | RawCSSProperties['paddingLeft']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  pr?:
    | RawCSSProperties['paddingRight']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  p?:
    | RawCSSProperties['padding']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  mt?:
    | RawCSSProperties['marginTop']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  mb?:
    | RawCSSProperties['marginBottom']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  ml?:
    | RawCSSProperties['marginLeft']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  mr?:
    | RawCSSProperties['marginRight']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  m?: RawCSSProperties['margin'] | Tokens['spacing'] | SemanticTokens['spacing']
  mx?:
    | RawCSSProperties['marginLeft']
    | Tokens['spacing']
    | SemanticTokens['spacing']
  my?:
    | RawCSSProperties['marginTop']
    | Tokens['spacing']
    | SemanticTokens['spacing']
}

type ExtraCSSPropertyValue<T> = {
  [K in keyof T]?:
    | T[K]
    | BreakpointArray
    | ResponsiveColor<T[K]>
    | BreakpointObject<T[K]>
}

export type CSSPropertiesOverrides = ExtraCSSPropertyValue<CSSProperties>
