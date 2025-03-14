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

type WithoutSx<T> = Omit<T, 'sx'>

export type ComponentThemes = {
  Box?: {
    defaultProps?: WithoutSx<BoxProps>
  }
  Button?: {
    styleOverrides?:
      | ComponentThemeObject<ButtonRecipe>
      | ComponentThemeFn<ButtonOwnerState, ButtonRecipe>
    defaultProps?: WithoutSx<ButtonProps>
  }
  Icon?: {
    styleOverrides?:
      | ComponentThemeObject<IconRecipe>
      | ComponentThemeFn<IconOwnerState, IconRecipe>
    defaultProps?: WithoutSx<InnerIconProps>
  }
  Flex?: {
    styleOverrides?:
      | ComponentThemeObject<FlexRecipe>
      | ComponentThemeFn<FlexOwnerState, FlexRecipe>
    defaultProps?: WithoutSx<FlexProps>
  }
  InputText?: {
    styleOverrides?:
      | ComponentThemeObject<InputTextRecipe>
      | ComponentThemeFn<InputTextOwnerState, InputTextRecipe>
    defaultProps?: WithoutSx<InputTextProps>
  }
  Divider?: {
    styleOverrides?:
      | ComponentThemeObject<DividerRecipe>
      | ComponentThemeFn<DividerOwnerState, DividerRecipe>
    defaultProps?: WithoutSx<DividerProps>
  }
  Avatar?: {
    styleOverrides?:
      | ComponentThemeObject<AvatarRecipe>
      | ComponentThemeFn<AvatarOwnerState, AvatarRecipe>
    defaultProps?: WithoutSx<AvatarProps>
  }
  Checkbox?: {
    styleOverrides?:
      | ComponentThemeObject<CheckboxRecipe>
      | ComponentThemeFn<CheckboxOwnerState, CheckboxRecipe>
    defaultProps?: WithoutSx<CheckboxProps>
  }
  Switch?: {
    styleOverrides?:
      | ComponentThemeObject<SwitchRecipe>
      | ComponentThemeFn<SwitchOwnerState, SwitchRecipe>
    defaultProps?: WithoutSx<SwitchProps>
  }
}

export type ComponentNames = keyof ComponentThemes
