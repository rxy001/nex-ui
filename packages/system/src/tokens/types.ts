import type { RawCSSProperties, Dictionary } from '../types'
import type { Token } from './createToken'

export type TokenValue = string | number

export type TokenCategories =
  | 'fontFamilies'
  | 'fontSizes'
  | 'fontWeights'
  | 'lineHeights'
  | 'colors'
  | 'spacing'
  | 'sizes'
  | 'borders'
  | 'radii'

export type ColorsDefinition = Dictionary<
  | {
      50: RawCSSProperties['color']
      100: RawCSSProperties['color']
      200: RawCSSProperties['color']
      300: RawCSSProperties['color']
      400: RawCSSProperties['color']
      500: RawCSSProperties['color']
      600: RawCSSProperties['color']
      700: RawCSSProperties['color']
      800: RawCSSProperties['color']
      900: RawCSSProperties['color']
      contrastText?: RawCSSProperties['color']
    }
  | RawCSSProperties['color']
>

export type RadiiDefinition = Dictionary<string | number>

export type SpacingDefinition = Dictionary<string | number>

export type SizesDefinition = Dictionary<string | number>

export type FontSizesDefinition = Dictionary<string | number>

export type FontWeightsDefinition = Dictionary<string | number>

export type LineHeightsDefinition = Dictionary<string | number>

export type FontFamiliesDefinition = Dictionary<string>

interface Recursive<T> {
  [key: string]: T | Recursive<T>
}

type SemanticColorToken =
  | RawCSSProperties['color']
  | {
      base?: RawCSSProperties['color']
      light?: RawCSSProperties['color']
      dark?: RawCSSProperties['color']
    }

export type SemanticTokensDefinition = {
  colors?: Recursive<{
    DEFAULT?: SemanticColorToken
    [key: string]: SemanticColorToken
  }>
}

export type BordersDefinition = Dictionary<string>

export type TokensDefinition = {
  colors?: ColorsDefinition
  spacing?: SpacingDefinition
  sizes?: SizesDefinition
  fontFamilies?: FontFamiliesDefinition
  fontSizes?: FontSizesDefinition
  fontWeights?: FontWeightsDefinition
  lineHeights?: LineHeightsDefinition
  borders?: BordersDefinition
  radii?: RadiiDefinition
}

export type Config = {
  tokens: TokensDefinition
  semanticTokens: SemanticTokensDefinition
  prefix: string
}

export type TokenMap = Map<string, Token>

export type CssVarMap = Map<string, Map<string, string | number>>
