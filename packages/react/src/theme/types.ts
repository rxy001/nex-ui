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
import type { ButtonStyles, IconStyles } from './styles'
import type { ButtonProps, ButtonOwnerState } from '../components'
import type { InnerIconProps, IconOwnerState } from '../components/icon/types'
import type {
  ComponentThemeFn,
  ExtractComponentStyles,
  TokenDefinition,
  ReplaceValuesWithColor,
} from './utils.types'
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
import type { CSSPropertiesOverrides as CSSProperties } from './generated/cssProperties'
import type { Selectors } from './generated/selectors'

export type ColorPalette =
  | Tokens['colors']
  | SemanticTokens['colors']
  | RawCSSProperties['color']

export type ComponentColor =
  | 'blue'
  | 'gray'
  | 'pink'
  | 'purple'
  | 'cyan'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'green'

declare module '@nex-ui/icons' {
  interface IconProps extends InnerIconProps {}
}

declare module '@nex-ui/system' {
  interface CSSPropertiesOverrides extends CSSProperties {}
}

export type ComponentsTheme = {
  Button?: {
    styleOverrides?:
      | ExtractComponentStyles<ButtonStyles>
      | ComponentThemeFn<ButtonOwnerState, ButtonStyles>
    defaultProps?: ButtonProps
  }
  Icon?: {
    styleOverrides?:
      | ExtractComponentStyles<IconStyles>
      | ComponentThemeFn<IconOwnerState, IconStyles>
    defaultProps?: InnerIconProps
  }
}

export type ComponentNames = keyof ComponentsTheme

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
