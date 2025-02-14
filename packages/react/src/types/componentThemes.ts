import type { DividerRecipe, FlexRecipe, IconRecipe } from '../theme/recipes'
import type {
  AvatarRecipe,
  ButtonRecipe,
  InputTextRecipe,
  CheckboxRecipe,
  SwitchRecipe,
} from '../theme/slotRecipes'
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
  CheckboxProps,
  CheckboxOwnerState,
  SwitchProps,
  SwitchOwnerState,
} from '../components'
import type { InnerIconProps } from '../components/icon/types'
import type { ComponentThemeObject, ComponentThemeFn } from './utils'

export type ComponentThemes = {
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
  Checkbox?: {
    styleOverrides?:
      | ComponentThemeObject<CheckboxRecipe>
      | ComponentThemeFn<CheckboxOwnerState, CheckboxRecipe>
    defaultProps?: CheckboxProps
  }
  Switch?: {
    styleOverrides?:
      | ComponentThemeObject<SwitchRecipe>
      | ComponentThemeFn<SwitchOwnerState, SwitchRecipe>
    defaultProps?: SwitchProps
  }
}

export type ComponentNames = keyof ComponentThemes
