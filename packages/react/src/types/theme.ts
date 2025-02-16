import type {
  ColorsDefinition,
  SpacingDefinition,
  SizesDefinition,
  FontFamiliesDefinition,
  FontSizesDefinition,
  FontWeightsDefinition,
  LineHeightsDefinition,
  BordersDefinition,
  RadiiDefinition,
  AliasesDefinition,
  ScalesDefinition,
  BreakpointsDefinition,
  SelectorsDefinition,
  ShadowsDefinition,
  ZIndexesDefinition,
  BorderWidthsDefinition,
  TransitionsDefinition,
  SemanticTokensDefinition,
} from '@nex-ui/system'
import type { DefaultAliases } from './generated/aliases'
import type { DefaultScales } from './generated/scales'
import type { DefaultBreakpoints } from './generated/breakpoints'
import type {
  FontFamiliesToken,
  ColorsToken,
  FontSizesToken,
  FontWeightsToken,
  SizesToken,
  SpacingToken,
  RadiiToken,
  BordersToken,
  LineHeightsToken,
  ShadowsToken,
  ZIndexesToken,
  BorderWidthsToken,
  TransitionsToken,
} from './generated/tokens'
import type { DefaultSelectors } from './generated/selectors'
import type { ComponentThemes } from './componentThemes'

export type Theme = {
  aliases?: AliasesDefinition & DefaultAliases
  scales?: ScalesDefinition & DefaultScales
  breakpoints?: BreakpointsDefinition & DefaultBreakpoints
  selectors?: SelectorsDefinition & DefaultSelectors
  semanticTokens?: SemanticTokensDefinition
  components?: ComponentThemes
  tokens?: {
    borders?: BordersDefinition & BordersToken
    spacing?: SpacingDefinition & SpacingToken
    colors?: ColorsDefinition & ColorsToken
    sizes?: SizesDefinition & SizesToken
    fontFamilies?: FontFamiliesDefinition & FontFamiliesToken
    fontSizes?: FontSizesDefinition & FontSizesToken
    fontWeights?: FontWeightsDefinition & FontWeightsToken
    lineHeights?: LineHeightsDefinition & LineHeightsToken
    radii?: RadiiDefinition & RadiiToken
    shadows?: ShadowsDefinition & ShadowsToken
    zIndexes?: ZIndexesDefinition & ZIndexesToken
    borderWidths?: BorderWidthsDefinition & BorderWidthsToken
    transitions?: TransitionsDefinition & TransitionsToken
  }
}
