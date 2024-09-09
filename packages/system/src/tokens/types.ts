import type { RawCSSProperties } from '../types'
import type { Token } from './createToken'

export type TokenValue = string | number

type Dictionary<T> = Record<string, T>

export type TokenCategory =
  | 'fontFamilies'
  | 'fontSizes'
  | 'fontWeights'
  | 'lineHeights'
  | 'colors'
  | 'spacing'
  | 'sizes'
  | 'borders'
  | 'radii'
  | 'breakpoints'

export type ColorsDefinition = Dictionary<
  | {
      50: RawCSSProperties['color']
      100: RawCSSProperties['color']
      200: RawCSSProperties['color']
      300: RawCSSProperties['color']
      400: RawCSSProperties['color']
      500: RawCSSProperties['color']
      600: RawCSSProperties['color']
      700: RawCSSProperties['color']
      800: RawCSSProperties['color']
      900: RawCSSProperties['color']
      contrastText?: RawCSSProperties['color']
    }
  | string
>

export type RadiiDefinition = Dictionary<string>

export type SpacingDefinition = Dictionary<string>

export type SizesDefinition = Dictionary<string>

export type FontFamiliesDefinition = Dictionary<string>

export type FontSizesDefinition = Dictionary<string>

export type FontWeightsDefinition = Dictionary<string | number>

export type LineHeightsDefinition = Dictionary<string | number>

// export type SemanticDefinition = {
//   colors?: {
//     [key: string]:
//       | {
//           50: CSSProperties['color']
//           100: CSSProperties['color']
//           200: CSSProperties['color']
//           300: CSSProperties['color']
//           400: CSSProperties['color']
//           500: CSSProperties['color']
//           600: CSSProperties['color']
//           700: CSSProperties['color']
//           800: CSSProperties['color']
//           900: CSSProperties['color']
//           contrastText?: CSSProperties['color']
//         }
//       | CSSProperties['color']
//   }
// }

export type BordersDefinition = Dictionary<string>

export type TokenDefinitions = {
  colors?: ColorsDefinition
  spacing?: SpacingDefinition
  sizes?: SizesDefinition
  fontFamilies?: FontFamiliesDefinition
  fontSizes?: FontSizesDefinition
  fontWeights?: FontWeightsDefinition
  lineHeights?: LineHeightsDefinition
  borders?: BordersDefinition
  radii?: RadiiDefinition
  // semantic?: SemanticDefinition
}

export type CreateTokensConfig = {
  tokens: TokenDefinitions
  prefix: string
}

export type TokenMap = Map<string, Token>

export type CssVarMap = Map<string, string | number>
