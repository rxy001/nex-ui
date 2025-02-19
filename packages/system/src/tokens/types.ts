import type { Dictionary, CSSProperties } from '../types'
import type { Token } from './createToken'

export type TokenValue = string | number

export type ResponsiveColor = {
  _DEFAULT?: CSSProperties['color']
  _light?: CSSProperties['color']
  _dark?: CSSProperties['color']
}

export type SemanticTokenValue = TokenValue | ResponsiveColor

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
  | 'borderWidths'
  | 'shadows'
  | 'zIndexes'
  | 'transitions'

export type ColorsDefinition = Dictionary<
  | {
      50?: CSSProperties['color']
      100?: CSSProperties['color']
      200?: CSSProperties['color']
      300?: CSSProperties['color']
      400?: CSSProperties['color']
      500?: CSSProperties['color']
      600?: CSSProperties['color']
      700?: CSSProperties['color']
      800?: CSSProperties['color']
      900?: CSSProperties['color']
      contrastText?: CSSProperties['color']
    }
  | CSSProperties['color']
>

export type RadiiDefinition = Dictionary<string | number>

export type SpacingDefinition = Dictionary<string | number>

export type SizesDefinition = Dictionary<string | number>

export type FontSizesDefinition = Dictionary<string | number>

export type FontWeightsDefinition = Dictionary<string | number>

export type LineHeightsDefinition = Dictionary<string | number>

export type BordersDefinition = Dictionary<string>

export type FontFamiliesDefinition = Dictionary<string>

export type TransitionsDefinition = Dictionary<string>

export type ShadowsDefinition = Dictionary<string>

export type BorderWidthsDefinition = Dictionary<string | number>

export type ZIndexesDefinition = Dictionary<number>

type NestedColor =
  | CSSProperties['color']
  | ResponsiveColor
  | ({
      DEFAULT?: CSSProperties['color'] | ResponsiveColor
      _DEFAULT?: never
      _light?: never
      _dark?: never
    } & {
      [key: string]: NestedColor
    })

export type SemanticColorDefinition = Dictionary<NestedColor>

// 将其改为泛性就会出现无法深层嵌套 ？？？
type StringAndNumberForNestedSemanticTokenValue =
  | string
  | number
  | ({
      DEFAULT?: string | number
    } & { [key: string]: StringAndNumberForNestedSemanticTokenValue })

type StringForNestedSemanticTokenValue =
  | string
  | ({
      DEFAULT?: string
    } & { [key: string]: StringForNestedSemanticTokenValue })

export type SemanticSpacingDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticSizesDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticFontFamiliesDefinition =
  Dictionary<StringForNestedSemanticTokenValue>

export type SemanticFontSizesDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticFontWeightsDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticLineHeightsDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticBordersDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticRadiiDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticTransitionsDefinition =
  Dictionary<StringForNestedSemanticTokenValue>

export type SemanticBorderWidthsDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticZIndexesDefinition =
  Dictionary<StringAndNumberForNestedSemanticTokenValue>

export type SemanticShadowsDefinition =
  Dictionary<StringForNestedSemanticTokenValue>

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
  transitions?: SemanticTransitionsDefinition
  shadows?: SemanticShadowsDefinition
  borderWidths?: SemanticBorderWidthsDefinition
  zIndexes?: SemanticZIndexesDefinition
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
  shadows?: ShadowsDefinition
  transitions?: TransitionsDefinition
  borderWidths?: BorderWidthsDefinition
  zIndexes?: ZIndexesDefinition
}

export type CreateTokensConfig = {
  tokens: TokensDefinition
  semanticTokens: SemanticTokensDefinition
  prefix: string
}

export type TokenMap = Map<string, Token>

export type ConditionKey = 'base' | 'light' | 'dark'

export type CssVarMap = Map<ConditionKey, Map<string, string | number>>
