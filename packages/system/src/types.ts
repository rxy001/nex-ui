/* eslint-disable no-use-before-define */
import type * as CSS from 'csstype'
import type { Keyframes } from '@emotion/react'
import type { ScalesDefinition } from './scales'
import type { TokensDefinition, SemanticTokensDefinition } from './tokens'
import type { AliasesDefinition } from './aliases'
import type { SelectorsDefinition } from './selectors'
import type { BreakpointsDefinition } from './breakpoints'

export type Dictionary<T = any> = Record<string, T>

export type SystemConfig = {
  cssVarsPrefix?: string
  scales?: ScalesDefinition
  aliases?: AliasesDefinition
  breakpoints?: BreakpointsDefinition
  selectors?: SelectorsDefinition
  tokens?: TokensDefinition
  semanticTokens?: SemanticTokensDefinition
}

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

export interface CSSPropertiesOverrides {}

export interface StyleObject
  extends Omit<RawCSSProperties, keyof CSSPropertiesOverrides>,
    CSSPropertiesOverrides,
    CSSPseudos,
    CSSOthersObject {}
