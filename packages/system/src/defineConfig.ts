/* istanbul ignore file */

import type {
  SemanticTokensDefinition,
  TokensDefinition,
  ColorsDefinition,
  BordersDefinition,
  LineHeightsDefinition,
  FontFamiliesDefinition,
  FontSizesDefinition,
  FontWeightsDefinition,
  SizesDefinition,
  SpacesDefinition,
  RadiiDefinition,
  ShadowsDefinition,
  TransitionsDefinition,
  BorderWidthsDefinition,
  ZIndicesDefinition,
  SemanticColorsDefinition,
  SemanticBordersDefinition,
  SemanticFontSizesDefinition,
  SemanticFontWeightsDefinition,
  SemanticSizesDefinition,
  SemanticLineHeightsDefinition,
  SemanticFontFamiliesDefinition,
  SemanticSpacesDefinition,
  SemanticRadiiDefinition,
  SemanticShadowsDefinition,
  SemanticTransitionsDefinition,
  SemanticBorderWidthsDefinition,
  SemanticZIndicesDefinition,
} from './tokens'
import type { SystemConfig } from './system'
import type { ScalesDefinition } from './scales'
import type { AliasesDefinition } from './aliases'
import type { SelectorsDefinition } from './selectors'
import type { BreakpointsDefinition } from './breakpoints'

export const defineConfig = (config: SystemConfig) => config
defineConfig.selectors = (v: SelectorsDefinition) => v
defineConfig.aliases = (v: AliasesDefinition) => v
defineConfig.scales = (v: ScalesDefinition) => v
defineConfig.breakpoints = (v: BreakpointsDefinition) => v

export const defineTokens = (v: TokensDefinition) => v
defineTokens.colors = (v: ColorsDefinition) => v
defineTokens.borders = (v: BordersDefinition) => v
defineTokens.lineHeights = (v: LineHeightsDefinition) => v
defineTokens.fontFamilies = (v: FontFamiliesDefinition) => v
defineTokens.fontSizes = (v: FontSizesDefinition) => v
defineTokens.fontWeights = (v: FontWeightsDefinition) => v
defineTokens.sizes = (v: SizesDefinition) => v
defineTokens.spaces = (v: SpacesDefinition) => v
defineTokens.radii = (v: RadiiDefinition) => v
defineTokens.shadows = (v: ShadowsDefinition) => v
defineTokens.transitions = (v: TransitionsDefinition) => v
defineTokens.borderWidths = (v: BorderWidthsDefinition) => v
defineTokens.zIndices = (v: ZIndicesDefinition) => v

export const defineSemanticTokens = (v: SemanticTokensDefinition) => v
defineSemanticTokens.colors = (v: SemanticColorsDefinition) => v
defineSemanticTokens.borders = (v: SemanticBordersDefinition) => v
defineSemanticTokens.lineHeights = (v: SemanticLineHeightsDefinition) => v
defineSemanticTokens.fontFamilies = (v: SemanticFontFamiliesDefinition) => v
defineSemanticTokens.fontSizes = (v: SemanticFontSizesDefinition) => v
defineSemanticTokens.fontWeights = (v: SemanticFontWeightsDefinition) => v
defineSemanticTokens.sizes = (v: SemanticSizesDefinition) => v
defineSemanticTokens.spaces = (v: SemanticSpacesDefinition) => v
defineSemanticTokens.radii = (v: SemanticRadiiDefinition) => v
defineSemanticTokens.shadows = (v: SemanticShadowsDefinition) => v
defineSemanticTokens.transitions = (v: SemanticTransitionsDefinition) => v
defineSemanticTokens.borderWidths = (v: SemanticBorderWidthsDefinition) => v
defineSemanticTokens.zIndices = (v: SemanticZIndicesDefinition) => v
