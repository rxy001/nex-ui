/* eslint-disable no-use-before-define */
import type * as CSS from 'csstype'
import type { CSSObject, Keyframes } from '@emotion/react'
import type { ScalesDefinition } from './scales'
import type { TokenDefinitions } from './tokens'
import type { AliasesDefinition } from './aliases'
import type { BreakpointsDefinition } from './breakpoints'

export type SystemConfig = {
  cssVarsPrefix?: string
  scales?: ScalesDefinition
  aliases?: AliasesDefinition
  breakpoints?: BreakpointsDefinition
} & TokenDefinitions

export type NormalizeFn = (
  style: StyleObject,
  specifiedColorPalette?: string,
) => CSSObject

/* StyleObject------start */
/**
 * 根据 scales 和及其相应的 token 推导出额外的 CSSPropertyValue
 *
 * 例如:
 * const colors = {
 *   primary: '#fff',
 * }
 *
 * const sclase = {
 *   color: 'colors'
 * }
 *
 * defineStyles({
 *   base: {
 *     color: '' // base: StyleObject,  给 color 赋值时会有 'primary' 的提示.
 *   }
 * })
 *
 */

export interface CSSPropertiesOverrides {}

export interface SystemDefinition {}

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

export type RawCSSProperties = CSS.PropertiesFallback<number | string>

type ConcatValue<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never

type ExtractValues<T, H> = {
  [K in keyof T]: T[K] extends object
    ? ConcatValue<K, keyof T[K]>
    : K extends string | number
      ? H extends 'spacing'
        ? `${K}` | `-${K}`
        : `${K}`
      : never
}[keyof T]

type ExtraPropertyValue = {
  [K in keyof SystemDefinition]: ExtractValues<SystemDefinition[K], K>
}

type ExtraCSSProperties = SystemDefinition extends { scales: infer Scales }
  ? {
      [K in keyof Scales]?:
        | (Scales[K] extends keyof ExtraPropertyValue
            ? ExtraPropertyValue[Scales[K]]
            : never)
        | (K extends keyof RawCSSProperties
            ? RawCSSProperties[K] & { __type?: never }
            : never)
    }
  : NonNullable<unknown>

type CSSProperties = Omit<RawCSSProperties, keyof ExtraCSSProperties> &
  ExtraCSSProperties

export type NexCSSProperties = SystemDefinition extends {
  breakpoints: infer Breakpoints
}
  ? {
      [K in keyof CSSProperties]?:
        | CSSProperties[K]
        | Array<CSSProperties[K]>
        | {
            [J in keyof Breakpoints]?: CSSProperties[K]
          }
    }
  : CSSProperties

type CSSPseudos = { [K in CSS.Pseudos]?: StyleObject }

interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation | ArrayCSSInterpolation
}

export interface StyleObject
  extends Omit<NexCSSProperties, keyof CSSPropertiesOverrides>,
    CSSPropertiesOverrides,
    CSSPseudos,
    CSSOthersObject {}
/* StyleObject------end */
