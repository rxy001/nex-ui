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
import { merge } from '@nex-ui/utils'
import { defaultConfig } from './preset'
import type { TokenDefinition, ReplaceValuesWithColor } from './types/utils'
import type { Aliases } from './types/generated/aliases'
import type { Scales } from './types/generated/scales'
import type { Breakpoints } from './types/generated/breakpoints'
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
} from './types/generated/tokens'
import type { Selectors } from './types/generated/selectors'
import type { ComponentsTheme } from './types/componentsTheme'

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

export function defineTheme(theme: Theme) {
  return theme ? merge({}, defaultConfig as Theme, theme) : theme
}
