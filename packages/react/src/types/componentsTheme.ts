import type {
  AvatarRecipe,
  ButtonRecipe,
  DividerRecipe,
  FlexRecipe,
  IconRecipe,
  InputTextRecipe,
} from '../theme/recipes'
import type {
  ButtonProps,
  ButtonOwnerState,
  IconOwnerState,
  FlexOwnerState,
  FlexProps,
  InputTextOwnerState,
  InputTextProps,
  DividerOwnerState,
  DividerProps,
  AvatarProps,
  AvatarOwnerState,
  BoxProps,
} from '../components'
import type { InnerIconProps } from '../components/icon/types'
import type { ComponentThemeFn, ComponentThemeObject } from './utils'

export type ComponentsTheme = {
  Box?: {
    defaultProps?: BoxProps
  }
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
  InputText?: {
    styleOverrides?:
      | ComponentThemeObject<InputTextRecipe>
      | ComponentThemeFn<InputTextOwnerState, InputTextRecipe>
    defaultProps?: InputTextProps
  }
  Divider?: {
    styleOverrides?:
      | ComponentThemeObject<DividerRecipe>
      | ComponentThemeFn<DividerOwnerState, DividerRecipe>
    defaultProps?: DividerProps
  }
  Avatar?: {
    styleOverrides?:
      | ComponentThemeObject<AvatarRecipe>
      | ComponentThemeFn<AvatarOwnerState, AvatarRecipe>
    defaultProps?: AvatarProps
  }
}

export type ComponentNames = keyof ComponentsTheme
