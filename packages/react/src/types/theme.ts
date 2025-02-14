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
  SemanticTokensDefinition,
  SelectorsDefinition,
  ShadowsDefinition,
  ZIndexesDefinition,
  BorderWidthsDefinition,
  TransitionsDefinition,
} from '@nex-ui/system'
import type { Aliases } from './generated/aliases'
import type { Scales } from './generated/scales'
import type { Breakpoints } from './generated/breakpoints'
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
import type { Selectors } from './generated/selectors'
import type { ComponentThemes } from './componentThemes'

export type Theme = {
  aliases?: AliasesDefinition & Aliases
  scales?: ScalesDefinition & Scales
  breakpoints?: BreakpointsDefinition & Breakpoints
  selectors?: SelectorsDefinition & Selectors
  components?: ComponentThemes
  semanticTokens?: SemanticTokensDefinition
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
