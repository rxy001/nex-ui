/* eslint-disable no-use-before-define */
import type * as CSS from 'csstype'
import type { Keyframes } from '@emotion/react'
import type { ScalesDefinition } from './scales'
import type { TokenDefinitions } from './tokens'
import type { AliasesDefinition } from './aliases'

export type SystemConfig = {
  cssVarsPrefix?: string
  scales?: ScalesDefinition
  aliases?: AliasesDefinition
} & TokenDefinitions

export type NormalizeFn<T extends Record<string, any> = Record<string, any>> = (
  style: T,
  specifiedColorPalette?: string,
) => T

/* StyleObject------start */
export interface OverwriteCSSProperties {}

type CSSPseudos = { [K in CSS.Pseudos]?: StyleObject }

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

interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation | ArrayCSSInterpolation
}

export interface SystemDefinition {}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never

type ExtractKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? Join<K, keyof T[K]>
    : K extends string | number
      ? `${K}`
      : never
}[keyof T]

type ExtractTokens<T> = {
  [K in keyof T]: ExtractKeys<T[K]>
}

type ExtraProperty = ExtractTokens<SystemDefinition>

type Scales = SystemDefinition extends { scales: ScalesDefinition }
  ? SystemDefinition['scales']
  : NonNullable<unknown>

type RawCSSProperties = CSS.PropertiesFallback<number | string>

type ExtraCSSProperties = {
  [K in keyof Scales]?:
    | ExtraProperty[Scales[K]]
    | (RawCSSProperties[K] & { __type?: never })
}

export type CSSProperties = Omit<RawCSSProperties, keyof ExtraCSSProperties> &
  ExtraCSSProperties

export interface StyleObject
  extends Omit<CSSProperties, keyof OverwriteCSSProperties>,
    OverwriteCSSProperties,
    CSSPseudos,
    CSSOthersObject {}
/* StyleObject------end */

export type ColorPalette = SystemDefinition extends { colors: object }
  ? keyof {
      [K in keyof SystemDefinition['colors'] as SystemDefinition['colors'][K] extends object
        ? K
        : never]: true
    }
  : never
