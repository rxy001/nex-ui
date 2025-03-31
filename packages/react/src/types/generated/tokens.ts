import type { CSSProperties } from '@nex-ui/system'
import type { UniteTokens } from '../utils'

export interface TokensOverrides {}

export type Tokens = UniteTokens<DefaultTokens, TokensOverrides>

export interface DefaultTokens {
  colors:
    | 'white'
    | 'black'
    | 'blue.50'
    | 'blue.100'
    | 'blue.200'
    | 'blue.300'
    | 'blue.400'
    | 'blue.500'
    | 'blue.600'
    | 'blue.700'
    | 'blue.800'
    | 'blue.900'
    | 'gray.50'
    | 'gray.100'
    | 'gray.200'
    | 'gray.300'
    | 'gray.400'
    | 'gray.500'
    | 'gray.600'
    | 'gray.700'
    | 'gray.800'
    | 'gray.900'
    | 'pink.50'
    | 'pink.100'
    | 'pink.200'
    | 'pink.300'
    | 'pink.400'
    | 'pink.500'
    | 'pink.600'
    | 'pink.700'
    | 'pink.800'
    | 'pink.900'
    | 'purple.50'
    | 'purple.100'
    | 'purple.200'
    | 'purple.300'
    | 'purple.400'
    | 'purple.500'
    | 'purple.600'
    | 'purple.700'
    | 'purple.800'
    | 'purple.900'
    | 'cyan.50'
    | 'cyan.100'
    | 'cyan.200'
    | 'cyan.300'
    | 'cyan.400'
    | 'cyan.500'
    | 'cyan.600'
    | 'cyan.700'
    | 'cyan.800'
    | 'cyan.900'
    | 'yellow.50'
    | 'yellow.100'
    | 'yellow.200'
    | 'yellow.300'
    | 'yellow.400'
    | 'yellow.500'
    | 'yellow.600'
    | 'yellow.700'
    | 'yellow.800'
    | 'yellow.900'
    | 'orange.50'
    | 'orange.100'
    | 'orange.200'
    | 'orange.300'
    | 'orange.400'
    | 'orange.500'
    | 'orange.600'
    | 'orange.700'
    | 'orange.800'
    | 'orange.900'
    | 'red.50'
    | 'red.100'
    | 'red.200'
    | 'red.300'
    | 'red.400'
    | 'red.500'
    | 'red.600'
    | 'red.700'
    | 'red.800'
    | 'red.900'
    | 'green.50'
    | 'green.100'
    | 'green.200'
    | 'green.300'
    | 'green.400'
    | 'green.500'
    | 'green.600'
    | 'green.700'
    | 'green.800'
    | 'green.900'
  sizes:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | 'max'
    | 'min'
    | 'full'
    | 'px'
    | '1.5'
    | '2.5'
    | '3.5'
    | '4.5'
    | '5.5'
    | '6.5'
    | '7.5'
    | '8.5'
    | '9.5'
  spaces:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | 'px'
    | '0.5'
    | '1.5'
    | '2.5'
    | '3.5'
    | '4.5'
    | '5.5'
    | '6.5'
    | '7.5'
    | '8.5'
    | '9.5'
    | '-1'
    | '-2'
    | '-3'
    | '-4'
    | '-5'
    | '-6'
    | '-7'
    | '-8'
    | '-9'
    | '-10'
    | '-11'
    | '-12'
    | '-13'
    | '-14'
    | '-15'
    | '-px'
    | '-0.5'
    | '-1.5'
    | '-2.5'
    | '-3.5'
    | '-4.5'
    | '-5.5'
    | '-6.5'
    | '-7.5'
    | '-8.5'
    | '-9.5'
  fontFamilies: 'sans' | 'serif' | 'mono'
  fontSizes: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fontWeights:
    | 'hairline'
    | 'thin'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black'
  borders: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radii: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  lineHeights: 'normal' | 'none' | 'shorter' | 'short' | 'base' | 'tall'
  borderWidths: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shadows: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  transitions:
    | 'all'
    | 'colors'
    | 'opacity'
    | 'shadow'
    | 'transform'
    | 'margin'
    | 'scale'
}

export interface ColorsToken {
  white?: CSSProperties['color']
  black?: CSSProperties['color']
  blue?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  gray?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  pink?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  purple?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  cyan?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  yellow?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  orange?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  red?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
  green?: {
    50?: CSSProperties['color']
    100?: CSSProperties['color']
    200?: CSSProperties['color']
    300?: CSSProperties['color']
    400?: CSSProperties['color']
    500?: CSSProperties['color']
    600?: CSSProperties['color']
    700?: CSSProperties['color']
    800?: CSSProperties['color']
    900?: CSSProperties['color']
  }
}

export interface SizesToken {
  '1'?: string | number
  '2'?: string | number
  '3'?: string | number
  '4'?: string | number
  '5'?: string | number
  '6'?: string | number
  '7'?: string | number
  '8'?: string | number
  '9'?: string | number
  '10'?: string | number
  '11'?: string | number
  '12'?: string | number
  '13'?: string | number
  '14'?: string | number
  '15'?: string | number
  max?: string | number
  min?: string | number
  full?: string | number
  px?: string | number
  '1.5'?: string | number
  '2.5'?: string | number
  '3.5'?: string | number
  '4.5'?: string | number
  '5.5'?: string | number
  '6.5'?: string | number
  '7.5'?: string | number
  '8.5'?: string | number
  '9.5'?: string | number
}

export interface SpacesToken {
  '1'?: string | number
  '2'?: string | number
  '3'?: string | number
  '4'?: string | number
  '5'?: string | number
  '6'?: string | number
  '7'?: string | number
  '8'?: string | number
  '9'?: string | number
  '10'?: string | number
  '11'?: string | number
  '12'?: string | number
  '13'?: string | number
  '14'?: string | number
  '15'?: string | number
  px?: string | number
  '0.5'?: string | number
  '1.5'?: string | number
  '2.5'?: string | number
  '3.5'?: string | number
  '4.5'?: string | number
  '5.5'?: string | number
  '6.5'?: string | number
  '7.5'?: string | number
  '8.5'?: string | number
  '9.5'?: string | number
}

export interface FontFamiliesToken {
  sans?: string
  serif?: string
  mono?: string
}

export interface FontSizesToken {
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
  '2xl'?: string | number
}

export interface FontWeightsToken {
  hairline?: string | number
  thin?: string | number
  light?: string | number
  normal?: string | number
  medium?: string | number
  semibold?: string | number
  bold?: string | number
  extrabold?: string | number
  black?: string | number
}

export interface BordersToken {
  xs?: string | number
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
}

export interface RadiiToken {
  xs?: string | number
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
  '2xl'?: string | number
  '3xl'?: string | number
  full?: string | number
}

export interface LineHeightsToken {
  normal?: string | number
  none?: string | number
  shorter?: string | number
  short?: string | number
  base?: string | number
  tall?: string | number
}

export interface BorderWidthsToken {
  xs?: string | number
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
}

export interface ShadowsToken {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export interface TransitionsToken {
  all?: string
  colors?: string
  opacity?: string
  shadow?: string
  transform?: string
  margin?: string
  scale?: string
}

export interface ZIndexesToken {}
