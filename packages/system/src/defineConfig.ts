import type { AliasesDefinition } from './aliases'
import type { BreakpointsDefinition } from './breakpoints'
import type { ScalesDefinition } from './scales'
import type { SelectorsDefinition } from './selectors'
import type {
  ColorsDefinition,
  BordersDefinition,
  LineHeightsDefinition,
  FontWeightsDefinition,
  FontFamiliesDefinition,
  FontSizesDefinition,
  SizesDefinition,
  SpacingDefinition,
  RadiiDefinition,
  SemanticTokensDefinition,
  TokensDefinition,
} from './tokens'
import type { SystemConfig } from './types'

export const defineConfig = (config: SystemConfig): SystemConfig => config
defineConfig.selectors = (v: SelectorsDefinition): SelectorsDefinition => v
defineConfig.aliases = (v: AliasesDefinition): AliasesDefinition => v
defineConfig.scales = (v: ScalesDefinition): ScalesDefinition => v
defineConfig.breakpoints = (v: BreakpointsDefinition): BreakpointsDefinition =>
  v

export const defineTokens = (v: TokensDefinition): TokensDefinition => v

defineTokens.colors = (v: ColorsDefinition): ColorsDefinition => v
defineTokens.borders = (v: BordersDefinition): BordersDefinition => v
defineTokens.lineHeights = (v: LineHeightsDefinition): LineHeightsDefinition =>
  v
defineTokens.fontFamilies = (
  v: FontFamiliesDefinition,
): FontFamiliesDefinition => v
defineTokens.fontSizes = (v: FontSizesDefinition): FontSizesDefinition => v
defineTokens.fontWeights = (v: FontWeightsDefinition): FontWeightsDefinition =>
  v
defineTokens.sizes = (v: SizesDefinition): SizesDefinition => v
defineTokens.spaceing = (v: SpacingDefinition): SpacingDefinition => v
defineTokens.radii = (v: RadiiDefinition): RadiiDefinition => v

export const defineSemanticTokens = (v: SemanticTokensDefinition) => v

defineSemanticTokens.colors = (v: SemanticTokensDefinition['colors']) => v
