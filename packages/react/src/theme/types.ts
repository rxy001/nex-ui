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
  RawCSSProperties,
} from '@nex-ui/system'
import type { NexStyledComponentProps as StyledComponentProps } from '@nex-ui/styled'
import type { InnerIconProps } from '../components/icon/types'
import type { TokenDefinition, ReplaceValuesWithColor } from './utils.types'
import type { Aliases } from './generated/aliases'
import type { Scales } from './generated/scales'
import type { Breakpoints } from './generated/breakpoints'
import type {
  Tokens,
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
import type { SemanticTokens } from './generated/semanticTokens'
import type { StyleObjectOverrides } from './generated/cssProperties'
import type { Selectors } from './generated/selectors'
import type { ComponentsTheme } from './componentsTheme.types'

type ColorPalette =
  | Tokens['colors']
  | SemanticTokens['colors']
  | RawCSSProperties['color']

export type NexStyledComponentProps<T> = Omit<
  StyledComponentProps<T>,
  'colorPalette'
> & {
  colorPalette?: ColorPalette
}

export type ComponentColor =
  | 'blue'
  | 'gray'
  | 'pink'
  | 'purple'
  | 'cyan'
  | 'red'
  | 'green'
  | 'yellow'
  | 'orange'

declare module '@nex-ui/icons' {
  interface IconProps extends InnerIconProps {}
}

declare module '@nex-ui/system' {
  interface StyleObject extends StyleObjectOverrides {}
}

export type Theme = {
  aliases?: AliasesDefinition & Aliases
  scales?: ScalesDefinition & Scales
  breakpoints?: TokenDefinition<Breakpoints, BreakpointsDefinition>
  selectors?: SelectorsDefinition & Selectors
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
  components?: ComponentsTheme
  semanticTokens?: SemanticTokensDefinition
}
