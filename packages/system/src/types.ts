/* eslint-disable no-use-before-define */
import type * as CSS from 'csstype'
import type { CSSObject, Keyframes } from '@emotion/react'
import type { ScalesDefinition } from './scales'
import type { TokenDefinitions } from './tokens'
import type { AliasesDefinition } from './aliases'
import type { BreakpointsDefinition } from './breakpoints'
import type { ExtraCSSProperties } from './utils.type'

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

type CSSProperties = Omit<
  RawCSSProperties,
  keyof ExtraCSSProperties<SystemDefinition, RawCSSProperties>
> &
  ExtraCSSProperties<SystemDefinition, RawCSSProperties>

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
