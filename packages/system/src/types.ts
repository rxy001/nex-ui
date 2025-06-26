import type {
  Keyframes,
  SerializedStyles,
  ComponentSelector,
} from '@emotion/react'
import type * as CSS from 'csstype'
import type { TokenCategory } from './tokens/types'

export interface Breakpoints {}
export interface Selectors {}
export interface Aliases {}
export interface Scales {}
export interface Tokens {}
export interface SemanticTokens {}

type Overwrite<K, T> = Omit<K, keyof T> & T

export type Dictionary<T = any> = Record<string, T>

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | CSSObject
  | Keyframes
  | SerializedStyles
  | ComponentSelector

export type CSSProperties = CSS.Properties<number | (string & {})>

export interface ArrayInterpolation
  extends ReadonlyArray<InterpolationPrimitive> {}

export type Interpolation = InterpolationPrimitive | ArrayInterpolation

type CSSOthersObject = {
  // TODO: 理想情况为 InterpolationPrimitive，但索引类型无法兼容明确字段的类型
  [propertiesName: string]: Interpolation
}

type ConvertToVirtualColor<T> = T extends `${string}.${infer U}`
  ? `colorPalette.${U}`
  : 'colorPalette'

type VirtualColor =
  | (Tokens extends infer T
      ? 'colors' extends keyof T
        ? ConvertToVirtualColor<T['colors']>
        : never
      : never)
  | (SemanticTokens extends infer T
      ? 'colors' extends keyof T
        ? ConvertToVirtualColor<T['colors']>
        : never
      : never)

type TypeValueByKey<T, K> = K extends keyof T ? T[K] : never

/**
 * Add the corresponding token values according to the scales.
 */
type OverriddenCSSProps = Overwrite<
  CSSProperties,
  {
    [K in keyof Scales]?: Exclude<Scales[K], undefined> extends TokenCategory
      ?
          | CSSProperties[K]
          | TypeValueByKey<Tokens, Scales[K]>
          | TypeValueByKey<SemanticTokens, Scales[K]>
          | (Exclude<Scales[K], undefined> extends 'colors'
              ? VirtualColor
              : never)
      : CSSProperties[K]
  }
>

type Conditions<T> = {
  [K in keyof Selectors | keyof Breakpoints as `_${K}`]?: T
} & {
  _dark?: T
  _light?: T
}

type BreakpointArray =
  | (string | number | null | undefined)[]
  | readonly (string | number | null | undefined)[]

type ExtraCSSPropertyValue<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]?:
    | T[K]
    | BreakpointArray
    | ({
        _DEFAULT?: T[K]
      } & Conditions<T[K]>)
}

/**
 * Shorthand types for CSS properties based on aliases.
 */
type CSSPropShorthands = {
  [K in keyof Aliases]?: Aliases[K] extends infer CSSProps
    ? CSSProps extends string
      ? CSSProps extends keyof OverriddenCSSProps
        ? OverriddenCSSProps[CSSProps]
        : never
      : CSSProps extends [infer CSSProp, ...unknown[]]
        ? CSSProp extends keyof OverriddenCSSProps
          ? OverriddenCSSProps[CSSProp]
          : never
        : never
    : never
}

type CSSPropertiesWithMultiValues = ExtraCSSPropertyValue<OverriddenCSSProps> &
  ExtraCSSPropertyValue<CSSPropShorthands> &
  Conditions<InterpolationPrimitive>

type CSSPseudos = {
  [K in CSS.Pseudos]?: CSSObject
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudos,
    CSSOthersObject {
  colorPalette?: OverriddenCSSProps['color']
}
