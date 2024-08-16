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
export interface CSSPropertiesOverrides {}

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

export interface SystemDefinition {}

export type RawCSSProperties = CSS.PropertiesFallback<number | string>

type ConnectKey<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never

type ExtractKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? ConnectKey<K, keyof T[K]>
    : K extends string | number
      ? `${K}`
      : never
}[keyof T]

type ExtraProperty = {
  [K in keyof SystemDefinition]: ExtractKeys<SystemDefinition[K]>
}

type Scales = SystemDefinition extends { scales: ScalesDefinition }
  ? SystemDefinition['scales']
  : NonNullable<unknown>

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
type ExtraCSSProperties = SystemDefinition extends { scales: ScalesDefinition }
  ? {
      [K in keyof Scales]?: ExtraProperty[Scales[K]] | RawCSSProperties[K]
    }
  : NonNullable<unknown>

export type CSSProperties = Omit<RawCSSProperties, keyof ExtraCSSProperties> &
  ExtraCSSProperties

type CSSPseudos = { [K in CSS.Pseudos]?: StyleObject }

interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation | ArrayCSSInterpolation
}

export interface StyleObject
  extends Omit<CSSProperties, keyof CSSPropertiesOverrides>,
    CSSPropertiesOverrides,
    CSSPseudos,
    CSSOthersObject {}
/* StyleObject------end */
