import type {
  ColorsDefinition,
  SpacesDefinition,
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
  ZIndicesDefinition,
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
  SpacesToken,
  RadiiToken,
  BordersToken,
  LineHeightsToken,
  ShadowsToken,
  ZIndicesToken,
  BorderWidthsToken,
  TransitionsToken,
} from './generated/tokens'
import type { DefaultSelectors } from './generated/selectors'
import type { ComponentThemes } from './componentThemes'
import type { colorVariant } from '../theme/shared'

export type Theme = {
  aliases?: AliasesDefinition & DefaultAliases
  scales?: ScalesDefinition & DefaultScales
  breakpoints?: BreakpointsDefinition & DefaultBreakpoints
  selectors?: SelectorsDefinition & DefaultSelectors
  semanticTokens?: SemanticTokensDefinition
  components?: ComponentThemes
  primaryThemeColor?: keyof typeof colorVariant
  tokens?: {
    borders?: BordersDefinition & BordersToken
    spaces?: SpacesDefinition & SpacesToken
    colors?: ColorsDefinition & ColorsToken
    sizes?: SizesDefinition & SizesToken
    fontFamilies?: FontFamiliesDefinition & FontFamiliesToken
    fontSizes?: FontSizesDefinition & FontSizesToken
    fontWeights?: FontWeightsDefinition & FontWeightsToken
    lineHeights?: LineHeightsDefinition & LineHeightsToken
    radii?: RadiiDefinition & RadiiToken
    shadows?: ShadowsDefinition & ShadowsToken
    zIndices?: ZIndicesDefinition & ZIndicesToken
    borderWidths?: BorderWidthsDefinition & BorderWidthsToken
    transitions?: TransitionsDefinition & TransitionsToken
  }
}
