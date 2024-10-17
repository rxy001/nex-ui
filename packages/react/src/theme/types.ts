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
} from '@nex-ui/system'
import type { ButtonStyles, IconStyles } from './styles'
import type { ButtonProps, ButtonOwnerState } from '../components'
import type { InnerIconProps, IconOwnerState } from '../components/icon/types'
import type { ComponentThemeFn, ExtractComponentStyles } from './utils.types'
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

export type ColorPalette = Tokens['colors'] | SemanticTokens['colors']

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
  breakpoints?: BreakpointsDefinition & Breakpoints
  tokens?: {
    borders?: BordersDefinition & Borders
    spacing?: SpacingDefinition & Spacing
    colors?: ColorsDefinition & Colors
    sizes?: SizesDefinition & Sizes
    fontFamilies?: FontFamiliesDefinition & FontFamilies
    fontSizes?: FontSizesDefinition & FontSizes
    fontWeights?: FontWeightsDefinition & FontWeights
    lineHeights?: LineHeightsDefinition & LineHeights
    radii?: RadiiDefinition & Radii
  }
  components?: ComponentsTheme
  semanticTokens?: SemanticTokensDefinition
}
