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
  [K in keyof Breakpoints as `_${K}`]: T
}

type BreakpointArray = (string | number)[] | readonly (string | number)[]

type TransformColors<T> = T extends `${string}.${infer U}`
  ? `colorPalette.${U}`
  : 'colorPalette'

type VirtualColors =
  | TransformColors<Tokens['colors']>
  | TransformColors<SemanticTokens['colors']>

export interface NexCSSProperties extends RawCSSProperties {
  _hover?: CSSInterpolation
  _active?: CSSInterpolation
  _disabled?: CSSInterpolation
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
  borderBottomColor?:
    | RawCSSProperties['borderBottomColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderTopColor?:
    | RawCSSProperties['borderTopColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderLeftColor?:
    | RawCSSProperties['borderLeftColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderRightColor?:
    | RawCSSProperties['borderRightColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  width?: RawCSSProperties['width'] | Tokens['sizes']
  minWidth?: RawCSSProperties['minWidth'] | Tokens['sizes']
  maxWidth?: RawCSSProperties['maxWidth'] | Tokens['sizes']
  height?: RawCSSProperties['height'] | Tokens['sizes']
  minHeight?: RawCSSProperties['minHeight'] | Tokens['sizes']
  maxHeight?: RawCSSProperties['maxHeight'] | Tokens['sizes']
  fontWeight?: RawCSSProperties['fontWeight'] | Tokens['fontWeights']
  lineHeight?: RawCSSProperties['lineHeight'] | Tokens['lineHeights']
  fontFamily?: RawCSSProperties['fontFamily'] | Tokens['fontFamilies']
  fontSize?: RawCSSProperties['fontSize'] | Tokens['fontSizes']
  gap?: RawCSSProperties['gap'] | Tokens['spacing']
  padding?: RawCSSProperties['padding'] | Tokens['spacing']
  paddingTop?: RawCSSProperties['paddingTop'] | Tokens['spacing']
  paddingBottom?: RawCSSProperties['paddingBottom'] | Tokens['spacing']
  paddingLeft?: RawCSSProperties['paddingLeft'] | Tokens['spacing']
  paddingRight?: RawCSSProperties['paddingRight'] | Tokens['spacing']
  marginRight?: RawCSSProperties['marginRight'] | Tokens['spacing']
  marginTop?: RawCSSProperties['marginTop'] | Tokens['spacing']
  marginLeft?: RawCSSProperties['marginLeft'] | Tokens['spacing']
  marginBottom?: RawCSSProperties['marginBottom'] | Tokens['spacing']
  margin?: RawCSSProperties['margin'] | Tokens['spacing']
  top?: RawCSSProperties['top'] | Tokens['spacing']
  left?: RawCSSProperties['left'] | Tokens['spacing']
  right?: RawCSSProperties['right'] | Tokens['spacing']
  bottom?: RawCSSProperties['bottom'] | Tokens['spacing']
  rowGap?: RawCSSProperties['rowGap'] | Tokens['spacing']
  columnGap?: RawCSSProperties['columnGap'] | Tokens['spacing']
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
  borderTopWidth?: RawCSSProperties['borderTopWidth'] | Tokens['borders']
  borderBottomWidth?: RawCSSProperties['borderBottomWidth'] | Tokens['borders']
  borderLeftWidth?: RawCSSProperties['borderLeftWidth'] | Tokens['borders']
  borderRightWidth?: RawCSSProperties['borderRightWidth'] | Tokens['borders']
  borderWidth?: RawCSSProperties['borderWidth'] | Tokens['borders']
  bg?:
    | RawCSSProperties['backgroundColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  fs?: RawCSSProperties['fontSize'] | Tokens['fontSizes']
  lh?: RawCSSProperties['lineHeight'] | Tokens['lineHeights']
  w?: RawCSSProperties['width'] | Tokens['sizes']
  h?: RawCSSProperties['height'] | Tokens['sizes']
  py?: RawCSSProperties['paddingTop'] | Tokens['spacing']
  px?: RawCSSProperties['paddingLeft'] | Tokens['spacing']
  pt?: RawCSSProperties['paddingTop'] | Tokens['spacing']
  pb?: RawCSSProperties['paddingBottom'] | Tokens['spacing']
  pl?: RawCSSProperties['paddingLeft'] | Tokens['spacing']
  pr?: RawCSSProperties['paddingRight'] | Tokens['spacing']
  p?: RawCSSProperties['padding'] | Tokens['spacing']
  mt?: RawCSSProperties['marginTop'] | Tokens['spacing']
  mb?: RawCSSProperties['marginBottom'] | Tokens['spacing']
  ml?: RawCSSProperties['marginLeft'] | Tokens['spacing']
  mr?: RawCSSProperties['marginRight'] | Tokens['spacing']
  m?: RawCSSProperties['margin'] | Tokens['spacing']
  mx?: RawCSSProperties['marginLeft'] | Tokens['spacing']
  my?: RawCSSProperties['marginTop'] | Tokens['spacing']
}

type ExtraCSSPropertyValue<T> = {
  [K in keyof T]?:
    | T[K]
    | BreakpointArray
    | ResponsiveColor<T[K]>
    | BreakpointObject<T[K]>
}

export type StyleObjectOverrides = ExtraCSSPropertyValue<NexCSSProperties>
