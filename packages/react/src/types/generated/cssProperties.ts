import type { CSSInterpolation, CSSProperties } from '@nex-ui/system'
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

export interface NexCSSProperties extends CSSProperties {
  _hover?: CSSInterpolation
  _active?: CSSInterpolation
  _focus?: CSSInterpolation
  _focusWithin?: CSSInterpolation
  _disabled?: CSSInterpolation
  color?:
    | CSSProperties['color']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderColor?:
    | CSSProperties['borderColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  backgroundColor?:
    | CSSProperties['backgroundColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderBottomColor?:
    | CSSProperties['borderBottomColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderTopColor?:
    | CSSProperties['borderTopColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderLeftColor?:
    | CSSProperties['borderLeftColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  borderRightColor?:
    | CSSProperties['borderRightColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  fill?:
    | CSSProperties['fill']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  stroke?:
    | CSSProperties['stroke']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  width?: CSSProperties['width'] | Tokens['sizes']
  minWidth?: CSSProperties['minWidth'] | Tokens['sizes']
  maxWidth?: CSSProperties['maxWidth'] | Tokens['sizes']
  height?: CSSProperties['height'] | Tokens['sizes']
  minHeight?: CSSProperties['minHeight'] | Tokens['sizes']
  maxHeight?: CSSProperties['maxHeight'] | Tokens['sizes']
  fontWeight?: CSSProperties['fontWeight'] | Tokens['fontWeights']
  lineHeight?: CSSProperties['lineHeight'] | Tokens['lineHeights']
  fontFamily?: CSSProperties['fontFamily'] | Tokens['fontFamilies']
  fontSize?: CSSProperties['fontSize'] | Tokens['fontSizes']
  gap?: CSSProperties['gap'] | Tokens['spacing']
  padding?: CSSProperties['padding'] | Tokens['spacing']
  paddingTop?: CSSProperties['paddingTop'] | Tokens['spacing']
  paddingBottom?: CSSProperties['paddingBottom'] | Tokens['spacing']
  paddingLeft?: CSSProperties['paddingLeft'] | Tokens['spacing']
  paddingRight?: CSSProperties['paddingRight'] | Tokens['spacing']
  marginRight?: CSSProperties['marginRight'] | Tokens['spacing']
  marginTop?: CSSProperties['marginTop'] | Tokens['spacing']
  marginLeft?: CSSProperties['marginLeft'] | Tokens['spacing']
  marginBottom?: CSSProperties['marginBottom'] | Tokens['spacing']
  margin?: CSSProperties['margin'] | Tokens['spacing']
  top?: CSSProperties['top'] | Tokens['spacing']
  left?: CSSProperties['left'] | Tokens['spacing']
  right?: CSSProperties['right'] | Tokens['spacing']
  bottom?: CSSProperties['bottom'] | Tokens['spacing']
  rowGap?: CSSProperties['rowGap'] | Tokens['spacing']
  columnGap?: CSSProperties['columnGap'] | Tokens['spacing']
  gridGap?: CSSProperties['gridGap'] | Tokens['spacing']
  gridColumnGap?: CSSProperties['gridColumnGap'] | Tokens['spacing']
  gridRow?: CSSProperties['gridRow'] | Tokens['spacing']
  borderRadius?: CSSProperties['borderRadius'] | Tokens['radii']
  borderTopRightRadius?: CSSProperties['borderTopRightRadius'] | Tokens['radii']
  borderTopLeftRadius?: CSSProperties['borderTopLeftRadius'] | Tokens['radii']
  borderBottomRightRadius?:
    | CSSProperties['borderBottomRightRadius']
    | Tokens['radii']
  borderBottomLeftRadius?:
    | CSSProperties['borderBottomLeftRadius']
    | Tokens['radii']
  borderTopWidth?: CSSProperties['borderTopWidth'] | Tokens['borderWidths']
  borderBottomWidth?:
    | CSSProperties['borderBottomWidth']
    | Tokens['borderWidths']
  borderLeftWidth?: CSSProperties['borderLeftWidth'] | Tokens['borderWidths']
  borderRightWidth?: CSSProperties['borderRightWidth'] | Tokens['borderWidths']
  borderWidth?: CSSProperties['borderWidth'] | Tokens['borderWidths']
  border?: CSSProperties['border'] | Tokens['borders']
  borderTop?: CSSProperties['borderTop'] | Tokens['borders']
  borderBottom?: CSSProperties['borderBottom'] | Tokens['borders']
  borderRight?: CSSProperties['borderRight'] | Tokens['borders']
  borderLeft?: CSSProperties['borderLeft'] | Tokens['borders']
  boxShadow?: CSSProperties['boxShadow']
  transition?: CSSProperties['transition'] | Tokens['transitions']
  zIndex?: CSSProperties['zIndex']
  bg?:
    | CSSProperties['backgroundColor']
    | Tokens['colors']
    | SemanticTokens['colors']
    | VirtualColors
  fs?: CSSProperties['fontSize'] | Tokens['fontSizes']
  lh?: CSSProperties['lineHeight'] | Tokens['lineHeights']
  w?: CSSProperties['width'] | Tokens['sizes']
  h?: CSSProperties['height'] | Tokens['sizes']
  py?: CSSProperties['paddingTop'] | Tokens['spacing']
  px?: CSSProperties['paddingLeft'] | Tokens['spacing']
  pt?: CSSProperties['paddingTop'] | Tokens['spacing']
  pb?: CSSProperties['paddingBottom'] | Tokens['spacing']
  pl?: CSSProperties['paddingLeft'] | Tokens['spacing']
  pr?: CSSProperties['paddingRight'] | Tokens['spacing']
  p?: CSSProperties['padding'] | Tokens['spacing']
  mt?: CSSProperties['marginTop'] | Tokens['spacing']
  mb?: CSSProperties['marginBottom'] | Tokens['spacing']
  ml?: CSSProperties['marginLeft'] | Tokens['spacing']
  mr?: CSSProperties['marginRight'] | Tokens['spacing']
  m?: CSSProperties['margin'] | Tokens['spacing']
  mx?: CSSProperties['marginLeft'] | Tokens['spacing']
  my?: CSSProperties['marginTop'] | Tokens['spacing']
}

type ExtraCSSPropertyValue<T> = {
  [K in keyof T]?:
    | T[K]
    | BreakpointArray
    | ResponsiveColor<T[K]>
    | BreakpointObject<T[K]>
}

export type StyleObjectOverrides = ExtraCSSPropertyValue<NexCSSProperties>
