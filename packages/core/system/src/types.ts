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

type CSSPropertiesWithMultiValues = ExtraCSSPropertyValue<OverriddenCSSProps> &
  ExtraCSSPropertyValue<CSSPropShorthands> &
  Conditions<Interpolation>

type CSSPseudos = {
  [K in CSS.Pseudos]?: CSSObject
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudos,
    CSSOthersObject {
  colorPalette?: OverriddenCSSProps['color']
}

// Converts a color token string (e.g., "colors.100") to a virtual color mapping (e.g., "colorPalette.100").
type ConvertToVirtualColor<T> = T extends `${string}.${infer U}`
  ? `colorPalette.${U}`
  : 'colorPalette'

// Map color token keys to a virtual color palette string.
type VirtualColor =
  | (Tokens extends infer T
      ? 'colors' extends keyof T
        ? ConvertToVirtualColor<T['colors']>
        : never
      : never)
  | (SemanticTokens extends infer T
      ? 'colors' extends keyof T
        ? ConvertToVirtualColor<T['colors']>
        : never
      : never)

type TypeValueByKey<T, K> = K extends keyof T ? T[K] : never

/**
 * Add the corresponding token values according to the scales.
 */
type OverriddenCSSProps = Overwrite<
  CSSProperties,
  {
    [K in keyof Scales]?: Exclude<Scales[K], undefined> extends TokenCategory
      ?
          | CSSProperties[K]
          | TypeValueByKey<Tokens, Scales[K]>
          | TypeValueByKey<SemanticTokens, Scales[K]>
          | (Exclude<Scales[K], undefined> extends 'colors'
              ? VirtualColor
              : never)
      : CSSProperties[K]
  }
>
/**
 * The Conditions type uses template literal types to prefix keys from Selectors and Breakpoints with an underscore (e.g., _hover, _sm).
 * This enables conditional styling based on selector or breakpoint context, allowing for easy extension and type safety.
 * Additional keys like _dark and _light are included for theme-based conditions.
 */
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

/**
 * Defines the possible values for each CSS property, supporting direct values, breakpoint arrays, and deeply nested conditional objects.
 * This type enables flexible assignment of CSS property values, including responsive and state-based variations.
 */
type ExtraCSSPropertyValue<T> = {
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

/**
 * CSSPropShorthands maps each key in Aliases to its corresponding CSS property value type.
 *
 * If an alias maps to a string, it checks if that string is a key in OverriddenCSSProps and uses its type.
 * If an alias maps to an array of strings, it uses the type of the first string as a key in OverriddenCSSProps.
 *
 * This enables shorthand properties (like 'bg' for 'backgroundColor') to inherit the correct type from OverriddenCSSProps.
 */
type CSSPropShorthands = {
  [K in keyof Aliases]?: Aliases[K] extends infer CSSProps
    ? CSSProps extends string
      ? CSSProps extends keyof OverriddenCSSProps
        ? OverriddenCSSProps[CSSProps]
        : never
      : CSSProps extends [infer CSSProp, ...unknown[]]
        ? CSSProp extends keyof OverriddenCSSProps
          ? OverriddenCSSProps[CSSProp]
          : never
        : never
    : never
}
