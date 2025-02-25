import type {
  Keyframes,
  SerializedStyles,
  ComponentSelector,
} from '@emotion/react'
import type * as CSS from 'csstype'

export type Dictionary<T = any> = Record<string, T>

export type CSSInterpolation =
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

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

export interface CSSObjectOverrides {}

type CSSOthersObject = {
  [propertiesName: string]:
    | CSSInterpolation
    | CSSInterpolation[]
    | readonly CSSInterpolation[]
  // [propertiesName: string]: CSSInterpolation | unknown
}

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
