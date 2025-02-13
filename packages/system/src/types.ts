import type * as CSS from 'csstype'

export type Dictionary<T = any> = Record<string, T>

export type CSSInterpolation =
  | null
  | undefined
  | boolean
  | number
  | string
  | StyleObject

export type CSSProperties = CSS.Properties<number | (string & {})>

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
