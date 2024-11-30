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
      50?: RawCSSProperties['color']
      100?: RawCSSProperties['color']
      200?: RawCSSProperties['color']
      300?: RawCSSProperties['color']
      400?: RawCSSProperties['color']
      500?: RawCSSProperties['color']
      600?: RawCSSProperties['color']
      700?: RawCSSProperties['color']
      800?: RawCSSProperties['color']
      900?: RawCSSProperties['color']
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

export type BordersDefinition = Dictionary<string | number>

export type FontFamiliesDefinition = Dictionary<string>

type ResponsiveColor = {
  _DEFAULT?: RawCSSProperties['color']
  _light?: RawCSSProperties['color']
  _dark?: RawCSSProperties['color']
}
type ExclusiveColor =
  | {
      DEFAULT?: RawCSSProperties['color'] | ResponsiveColor
      _DEFAULT?: never
      _light?: never
      _dark?: never
    }
  | ({
      DEFAULT?: never
    } & ResponsiveColor)

type NestedColor =
  | RawCSSProperties['color'] // Directly a color value
  | (ExclusiveColor & {
      [key: string]: NestedColor // Nested colors, applying the mutually exclusive rule
    }) // Either `DEFAULT` or ResponsiveColor properties

type SemanticTokenDefinition<T> =
  | T
  | ({
      DEFAULT?: T
    } & { [key: string]: SemanticTokenDefinition<T> })

export type SemanticColorDefinition = Dictionary<NestedColor>

export type SemanticSpacingDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>

export type SemanticSizesDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>

export type SemanticFontFamiliesDefinition = Dictionary<
  SemanticTokenDefinition<string>
>

export type SemanticFontSizesDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>

export type SemanticFontWeightsDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>

export type SemanticLineHeightsDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>
export type SemanticBordersDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>
export type SemanticRadiiDefinition = Dictionary<
  SemanticTokenDefinition<string | number>
>

export type SemanticTokensDefinition = {
  colors?: SemanticColorDefinition
  spacing?: SemanticSpacingDefinition
  sizes?: SemanticSizesDefinition
  fontFamilies?: SemanticFontFamiliesDefinition
  fontSizes?: SemanticFontSizesDefinition
  fontWeights?: SemanticFontWeightsDefinition
  lineHeights?: SemanticLineHeightsDefinition
  borders?: SemanticBordersDefinition
  radii?: SemanticRadiiDefinition
}

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

export type CreateTokensConfig = {
  tokens: TokensDefinition
  semanticTokens: SemanticTokensDefinition
  prefix: string
}

export type TokenMap = Map<string, Token>

export type CssVarMap = Map<string, Map<string, string | number>>
