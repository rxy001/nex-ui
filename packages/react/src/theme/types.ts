import type {
  NexCSSProperties,
  CSSInterpolation,
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
} from '@nex-ui/system'
import type { defaultTheme } from './preset'
import type { ButtonComponentStyles, IconComponentStyles } from './styles'
import type { ButtonProps, ButtonOwnerState } from '../components'
import type { InnerIconProps, IconOwnerState } from '../components/icon/types'
import type { DeepMerge, ComponentThemeFn } from './utils.types'

type DefaultTheme = typeof defaultTheme

export type BasicTheme = {
  aliases?: AliasesDefinition & Partial<DefaultTheme['aliases']>
  borders?: BordersDefinition & Partial<DefaultTheme['borders']>
  spacing?: SpacingDefinition & Partial<DefaultTheme['spacing']>
  colors?: ColorsDefinition & Partial<DefaultTheme['colors']>
  sizes?: SizesDefinition & Partial<DefaultTheme['sizes']>
  fontFamilies?: FontFamiliesDefinition & Partial<DefaultTheme['fontFamilies']>
  fontSizes?: FontSizesDefinition & Partial<DefaultTheme['fontSizes']>
  fontWeights?: FontWeightsDefinition & Partial<DefaultTheme['fontWeights']>
  lineHeights?: LineHeightsDefinition & Partial<DefaultTheme['lineHeights']>
  radii?: RadiiDefinition & Partial<DefaultTheme['radii']>
  scales?: ScalesDefinition & Partial<DefaultTheme['scales']>
}

export interface ThemeOverrides {}

export interface Aliases {
  _hover?: CSSInterpolation
  _active?: CSSInterpolation
  _disabled?: CSSInterpolation

  _bg?: NexCSSProperties['backgroundColor']
  _fs?: NexCSSProperties['fontSize']
  _lh?: NexCSSProperties['lineHeight']
  _w?: NexCSSProperties['width']
  _h?: NexCSSProperties['height']

  _py?: NexCSSProperties['paddingTop']
  _px?: NexCSSProperties['paddingLeft']
  _pt?: NexCSSProperties['paddingTop']
  _pb?: NexCSSProperties['paddingBottom']
  _pl?: NexCSSProperties['paddingLeft']
  _pr?: NexCSSProperties['paddingRight']
  _p?: NexCSSProperties['padding']

  _mt?: NexCSSProperties['marginTop']
  _mb?: NexCSSProperties['marginBottom']
  _ml?: NexCSSProperties['marginLeft']
  _mr?: NexCSSProperties['marginRight']
  _mx?: NexCSSProperties['marginLeft']
  _my?: NexCSSProperties['marginTop']
  _m?: NexCSSProperties['margin']
}

type System = DeepMerge<DefaultTheme, ThemeOverrides>

/**
 * 根据 System 推导出定义的 colors key, 不包含 semantic 中的 colors
 */
export type ColorPalette = System extends { colors: object }
  ? keyof {
      [K in keyof System['colors'] as System['colors'][K] extends object
        ? K
        : never]: true
    }
  : never

declare module '@nex-ui/system' {
  interface SystemDefinition extends System {}

  interface CSSPropertiesOverrides extends Aliases {}
}

declare module '@nex-ui/icons' {
  interface IconProps extends InnerIconProps {}
}

export type ComponentsTheme = {
  Button?: {
    styleOverrides?: ButtonComponentStyles | ComponentThemeFn<ButtonOwnerState>
    defaultProps?: ButtonProps
  }
  Icon?: {
    styleOverrides?: IconComponentStyles | ComponentThemeFn<IconOwnerState>
    defaultProps?: InnerIconProps
  }
}

export type ComponentNames = keyof ComponentsTheme
