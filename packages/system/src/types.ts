import type {
  Keyframes,
  SerializedStyles,
  ComponentSelector,
} from '@emotion/react'
import type * as CSS from 'csstype'

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

export interface CSSObjectOverrides {}

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

type CSSPropertiesWithOverrides = Omit<
  CSSProperties & { colorPalette?: CSSProperties['color'] },
  keyof CSSObjectOverrides
> &
  CSSObjectOverrides

export interface CSSObject
  extends CSSPropertiesWithOverrides,
    CSSPseudos,
    CSSOthersObject {}

export type CSSPropertyKey = keyof CSSProperties
