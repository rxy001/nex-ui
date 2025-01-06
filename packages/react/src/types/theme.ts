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
} from '@nex-ui/system'
import type { TokenDefinition, ReplaceValuesWithColor } from './utils'
import type { Aliases } from './generated/aliases'
import type { Scales } from './generated/scales'
import type { Breakpoints } from './generated/breakpoints'
import type {
  FontFamilies,
  Colors,
  FontSizes,
  FontWeights,
  Sizes,
  Spacing,
  Radii,
  Borders,
  LineHeights,
} from './generated/tokens'
import type { Selectors } from './generated/selectors'
import type { ComponentsTheme } from './componentsTheme'

export type Theme = {
  aliases?: AliasesDefinition & Aliases
  scales?: ScalesDefinition & Scales
  breakpoints?: TokenDefinition<Breakpoints, BreakpointsDefinition>
  selectors?: SelectorsDefinition & Selectors
  components?: ComponentsTheme
  semanticTokens?: SemanticTokensDefinition
  tokens?: {
    borders?: TokenDefinition<Borders, BordersDefinition>
    spacing?: TokenDefinition<Spacing, SpacingDefinition>
    colors?: ColorsDefinition & ReplaceValuesWithColor<Colors>
    sizes?: TokenDefinition<Sizes, SizesDefinition>
    fontFamilies?: TokenDefinition<FontFamilies, FontFamiliesDefinition>
    fontSizes?: TokenDefinition<FontSizes, FontSizesDefinition>
    fontWeights?: TokenDefinition<FontWeights, FontWeightsDefinition>
    lineHeights?: TokenDefinition<LineHeights, LineHeightsDefinition>
    radii?: TokenDefinition<Radii, RadiiDefinition>
  }
}
