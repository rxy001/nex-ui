import type { Token } from './createToken'

export type TokenValue = string | number

type Dictionary<T> = Record<string, T>

export type TokenCategory =
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
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
      contrastText?: string
    }
  | string
>

export type RadiiDefinition = Dictionary<string>

export type SpacingDefinition = Dictionary<string>

export type SizesDefinition = Dictionary<string>

export type FontFamiliesDefinition = Dictionary<string>

export type FontSizesDefinition = Dictionary<string>

export type FontWeightsDefinition = Dictionary<string | number>

export type LineHeightsDefinition = Dictionary<string | number>

// export type SemanticDefinition = Dictionary<string | Dictionary<string>>

export type BordersDefinition = Dictionary<string>

export type TokenDefinitions = {
  colors?: ColorsDefinition
  spacing?: SpacingDefinition
  sizes?: SizesDefinition
  fontFamilies: FontFamiliesDefinition
  fontSizes: FontSizesDefinition
  fontWeights: FontWeightsDefinition
  lineHeights: LineHeightsDefinition
  borders?: BordersDefinition
  radii?: RadiiDefinition
  // semanticTokens?: SemanticDefinition
}

export type CreateTokensConfig = {
  tokens: TokenDefinitions
  prefix: string
}

export type TokenMap = Map<string, Token>

export type CssVarMap = Map<string, string | number>
