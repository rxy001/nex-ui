import type { ButtonRecipe, FlexRecipe, IconRecipe } from '../recipes'
import type {
  ButtonProps,
  ButtonOwnerState,
  IconOwnerState,
  FlexOwnerState,
  FlexProps,
} from '../../components'
import type { InnerIconProps } from '../../components/icon/types'
import type { ComponentThemeFn, ComponentThemeObject } from './utils'

export type ComponentsTheme = {
  Button?: {
    styleOverrides?:
      | ComponentThemeObject<ButtonRecipe>
      | ComponentThemeFn<ButtonOwnerState, ButtonRecipe>
    defaultProps?: ButtonProps
  }
  Icon?: {
    styleOverrides?:
      | ComponentThemeObject<IconRecipe>
      | ComponentThemeFn<IconOwnerState, IconRecipe>
    defaultProps?: InnerIconProps
  }
  Flex?: {
    styleOverrides?:
      | ComponentThemeObject<FlexRecipe>
      | ComponentThemeFn<FlexOwnerState, FlexRecipe>
    defaultProps?: FlexProps
  }
}

export type ComponentNames = keyof ComponentsTheme
