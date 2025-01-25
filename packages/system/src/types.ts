import type * as CSS from 'csstype'
import type { Keyframes } from '@emotion/react'

export type Dictionary<T = any> = Record<string, T>

export type CSSInterpolation =
  | null
  | undefined
  | boolean
  | number
  | string
  | StyleObject
  | Keyframes

export type CSSProperties = CSS.Properties<
  number | (string & NonNullable<unknown>)
>

export interface ArrayCSSInterpolation
  extends ReadonlyArray<CSSInterpolation> {}

type CSSPseudos = { [K in CSS.Pseudos]?: StyleObject }

interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation | ArrayCSSInterpolation
}

export interface StyleObjectOverrides {}

export interface StyleObject
  extends Omit<
      CSSProperties & {
        colorPalette?: CSSProperties['color']
      },
      keyof StyleObjectOverrides
    >,
    StyleObjectOverrides,
    CSSPseudos,
    CSSOthersObject {}

export type CSSPropertyKey = keyof CSSProperties
