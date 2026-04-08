import type {
  Keyframes,
  SerializedStyles,
  ComponentSelector,
} from '@emotion/react'
import type * as CSS from 'csstype'
import type { TokenCategory } from './tokens/types'

export interface Breakpoints {}
export interface Selectors {}
export interface Aliases {}
export interface Scales {}
export interface Tokens {}
export interface SemanticTokens {}

type Overwrite<K, T> = Omit<K, keyof T> & T

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

export type CSSProperties = CSS.Properties<number | (string & {})>

export type ArrayInterpolation = ReadonlyArray<Interpolation>

export type Interpolation = InterpolationPrimitive | ArrayInterpolation

type CSSOthersObject = {
  [propertiesName: string]: Interpolation
}

export type SystemCSSProps = ConditionalResponsiveProps<TokenizedCSSProps> &
  ConditionalResponsiveProps<AliasCSSProps>

type CSSPseudos = {
  [K in CSS.Pseudos]?: CSSObject
}

export interface CSSObject
  extends SystemCSSProps,
    CSSPseudos,
    Conditions<Interpolation>,
    CSSOthersObject {
  colorPalette?: TokenizedCSSProps['color']
}

type VirtualColorToken<T> = 'colors' extends keyof T
  ? T['colors'] extends `${string}.${infer U}`
    ? `colorPalette.${U}`
    : 'colorPalette'
  : never

type TypeValueByKey<T, K> = K extends keyof T ? T[K] : never

type TokenizedCSSProps = Overwrite<
  CSSProperties,
  {
    [K in keyof Scales]?: Exclude<Scales[K], undefined> extends TokenCategory
      ?
          | CSSProperties[K]
          | TypeValueByKey<Tokens, Scales[K]>
          | TypeValueByKey<SemanticTokens, Scales[K]>
          | (Exclude<Scales[K], undefined> extends 'colors'
              ? VirtualColorToken<Tokens> | VirtualColorToken<SemanticTokens>
              : never)
      : CSSProperties[K]
  }
>

type Conditions<T> = {
  [K in keyof Selectors | keyof Breakpoints as `_${K}`]?: T
} & {
  _dark?: T
  _light?: T
}

type BreakpointArray = (string | number | null | undefined)[]

type NestedConditions<T> = {
  _DEFAULT?: T
} & { [K in keyof Conditions<T>]?: NestedConditions<T> | T }

type ConditionalResponsiveProps<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]?:
    | T[K]
    | BreakpointArray
    /**
     * bg: {
     *      _DEFAULT: 'colorPalette.100',
     *      _hover: 'colorPalette.50',
     *      _dark: {
     *        _DEFAULT: 'colorPalette.800/30',
     *        _hover: 'colorPalette.900/30',
     *      },
     *    },
     */
    | NestedConditions<T[K]>
}

type AliasCSSProps = {
  [K in keyof Aliases]?: Aliases[K] extends infer CSSProps
    ? CSSProps extends string
      ? CSSProps extends keyof TokenizedCSSProps
        ? TokenizedCSSProps[CSSProps]
        : never
      : CSSProps extends [infer CSSProp, ...unknown[]]
        ? CSSProp extends keyof TokenizedCSSProps
          ? TokenizedCSSProps[CSSProp]
          : never
        : never
    : never
}
