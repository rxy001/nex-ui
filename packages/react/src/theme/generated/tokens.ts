import type { RawCSSProperties } from '@nex-ui/system'

export interface Tokens {
  colors:
    | 'transparent'
    | 'current'
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
    | 'blue.contrastText'
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
    | 'gray.contrastText'
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
    | 'pink.contrastText'
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
    | 'purple.contrastText'
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
    | 'cyan.contrastText'
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
    | 'yellow.contrastText'
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
    | 'orange.contrastText'
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
    | 'red.contrastText'
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
    | 'green.contrastText'
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
    | 'max'
    | 'min'
    | 'full'
    | 'px'
  spacing:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | 'px'
    | '0.5'
    | '1.5'
    | '2.5'
    | '3.5'
  fontFamilies: 'heading' | 'body' | 'mono'
  fontSizes: 'sm' | 'md' | 'lg'
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
  radii: 'sm' | 'md' | 'lg'
  lineHeights: 'normal' | 'none' | 'shorter' | 'short' | 'base' | 'tall'
}

export interface Colors {
  transparent?: RawCSSProperties['color']
  current?: RawCSSProperties['color']
  white?: RawCSSProperties['color']
  black?: RawCSSProperties['color']
  blue?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  gray?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  pink?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  purple?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  cyan?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  yellow?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  orange?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  red?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
  green?: {
    50?: RawCSSProperties['color']
    100?: RawCSSProperties['color']
    200?: RawCSSProperties['color']
    300?: RawCSSProperties['color']
    400?: RawCSSProperties['color']
    500?: RawCSSProperties['color']
    600?: RawCSSProperties['color']
    700?: RawCSSProperties['color']
    800?: RawCSSProperties['color']
    900?: RawCSSProperties['color']
    contrastText?: RawCSSProperties['color']
  }
}

export interface Sizes {
  1?: string | number
  2?: string | number
  3?: string | number
  4?: string | number
  5?: string | number
  6?: string | number
  7?: string | number
  8?: string | number
  9?: string | number
  10?: string | number
  max?: string | number
  min?: string | number
  full?: string | number
  px?: string | number
}

export interface Spacing {
  1?: string | number
  2?: string | number
  3?: string | number
  4?: string | number
  5?: string | number
  6?: string | number
  7?: string | number
  8?: string | number
  px?: string | number
  0.5?: string | number
  1.5?: string | number
  2.5?: string | number
  3.5?: string | number
}

export interface FontFamilies {
  heading?: string
  body?: string
  mono?: string
}

export interface FontSizes {
  sm?: string | number
  md?: string | number
  lg?: string | number
}

export interface FontWeights {
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

export interface Borders {
  xs?: string | number
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
}

export interface Radii {
  sm?: string | number
  md?: string | number
  lg?: string | number
}

export interface LineHeights {
  normal?: string | number
  none?: string | number
  shorter?: string | number
  short?: string | number
  base?: string | number
  tall?: string | number
}
