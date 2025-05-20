import type {
  Keyframes,
  SerializedStyles,
  ComponentSelector,
} from '@emotion/react'
import type * as CSS from 'csstype'
import type { TokenCategory } from './tokens/types'

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

export interface ArrayCSSInterpolation
  extends ReadonlyArray<CSSInterpolation> {}

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

export type CSSProperties = CSS.Properties<number | (string & {})>

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

type CSSOthersObject = {
  [propertiesName: string]: CSSInterpolation
  // [propertiesName: string]: InterpolationPrimitive | unknown
}

export interface ArrayInterpolation<Props = unknown>
  extends ReadonlyArray<Interpolation<Props>> {}

export interface FunctionInterpolation<Props = unknown> {
  (props: Props): Interpolation<Props>
}

export type Interpolation<Props = unknown> =
  | InterpolationPrimitive
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>

export interface Breakpoints {}
export interface Selectors {}
export interface Aliases {}
export interface Scales {}
export interface Tokens {}
export interface SemanticTokens {}

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
export type OverriddenCSSProps = Overwrite<
  CSSProperties,
  {
    [K in keyof Scales]: Exclude<Scales[K], undefined> extends TokenCategory
      ?
          | CSSProperties[K]
          | TypeValueByKey<Tokens, Scales[K]>
          | TypeValueByKey<SemanticTokens, Scales[K]>
          | ('colors' extends Scales[K] ? VirtualColor : never)
      : CSSProperties[K]
  }
>

type Conditions<T> = {
  [K in keyof Selectors as `_${K}`]?: T
} & {
  [K in keyof Breakpoints as `_${K}`]?: T
} & {
  _dark?: T
  _light?: T
}

type BreakpointArray =
  | (string | number | null | undefined)[]
  | readonly (string | number | null | undefined)[]

type NestedConditions<T> = {
  _DEFAULT?: T
} & Conditions<T> & { [K in keyof Conditions<T>]: NestedConditions<T> }

type ExtraCSSPropertyValue<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]?:
    | T[K]
    | BreakpointArray
    | NestedConditions<T[K]>
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
      : CSSProps extends any[]
        ? CSSProps[number] extends keyof OverriddenCSSProps
          ? OverriddenCSSProps[CSSProps[0]]
          : never
        : never
    : never
}

type OverriddenCSSObject = ExtraCSSPropertyValue<OverriddenCSSProps> &
  ExtraCSSPropertyValue<CSSPropShorthands> &
  Conditions<CSSInterpolation>

export interface CSSObject
  extends OverriddenCSSObject,
    CSSPseudos,
    CSSOthersObject {
  colorPalette?: OverriddenCSSProps['color']
}
