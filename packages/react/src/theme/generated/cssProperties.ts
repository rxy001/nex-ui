import type { RawCSSProperties, CSSInterpolation } from '@nex-ui/system'
import type { Tokens } from './tokens'
import type { Breakpoints } from './breakpoints'

type ColorScheme<T> = {
  DEFAULT?: T
  _dark?: T
  _light?: T
}

type BreakpointObject<T> = {
  [key in keyof Breakpoints as `_${key}`]: T
}

type BreakpointArray = (string | number)[]

interface CSSProperties extends RawCSSProperties {
  _hover?: CSSInterpolation
  _active?: CSSInterpolation
  _disabled?: CSSInterpolation
  _dark?: CSSInterpolation
  _light?: CSSInterpolation
  color?: RawCSSProperties['color'] | Tokens['colors']
  borderColor?: RawCSSProperties['borderColor'] | Tokens['colors']
  backgroundColor?: RawCSSProperties['backgroundColor'] | Tokens['colors']
  fontSize?: RawCSSProperties['fontSize'] | Tokens['fontSizes']
  borderWidth?: RawCSSProperties['borderWidth'] | Tokens['borders']
  width?: RawCSSProperties['width'] | Tokens['sizes']
  height?: RawCSSProperties['height'] | Tokens['sizes']
  lineHeight?: RawCSSProperties['lineHeight'] | Tokens['lineHeights']
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
  bg?: RawCSSProperties['backgroundColor'] | Tokens['colors']
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
    | BreakpointObject<T[K]>
    | BreakpointArray
    | ColorScheme<T[K]>
}

export type CSSPropertiesOverrides = ExtraCSSPropertyValue<CSSProperties>
