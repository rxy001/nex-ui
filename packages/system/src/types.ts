/* eslint-disable no-use-before-define */
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

export interface ArrayCSSInterpolation
  extends ReadonlyArray<CSSInterpolation> {}

export type RawCSSProperties = CSS.PropertiesFallback<
  number | (string & NonNullable<unknown>)
>

type CSSPseudos = { [K in CSS.Pseudos]?: StyleObject }

interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation | ArrayCSSInterpolation
}

export interface StyleObjectOverrides {}

export interface StyleObject
  extends Omit<RawCSSProperties, keyof StyleObjectOverrides>,
    StyleObjectOverrides,
    CSSPseudos,
    CSSOthersObject {
  colorPalette?: StyleObject['color']
}
