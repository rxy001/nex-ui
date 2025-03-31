import { type ElementType } from 'react'
import type { DividerRecipe, FlexRecipe, IconRecipe } from '../theme/recipes'
import type {
  AvatarRecipe,
  ButtonRecipe,
  InputRecipe,
  CheckboxRecipe,
  SwitchRecipe,
} from '../theme/slotRecipes'
import type {
  ButtonProps,
  ButtonOwnerState,
  IconOwnerState,
  FlexOwnerState,
  FlexProps,
  InputOwnerState,
  InputProps,
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
import type { IconProps } from '../components/icon/types'
import type { ComponentThemeObject, ComponentThemeFn } from './utils'

export type ComponentThemes = {
  Box?: {
    defaultProps?: BoxProps
  }
  Button?: {
    styleOverrides?:
      | ComponentThemeObject<ButtonRecipe>
      | ComponentThemeFn<ButtonOwnerState, ButtonRecipe>
    defaultProps?: ButtonProps<ElementType>
  }
  Icon?: {
    styleOverrides?:
      | ComponentThemeObject<IconRecipe>
      | ComponentThemeFn<IconOwnerState, IconRecipe>
    defaultProps?: IconProps<ElementType>
  }
  Flex?: {
    styleOverrides?:
      | ComponentThemeObject<FlexRecipe>
      | ComponentThemeFn<FlexOwnerState, FlexRecipe>
    defaultProps?: FlexProps<ElementType>
  }
  Input?: {
    styleOverrides?:
      | ComponentThemeObject<InputRecipe>
      | ComponentThemeFn<InputOwnerState, InputRecipe>
    defaultProps?: InputProps<ElementType>
  }
  Divider?: {
    styleOverrides?:
      | ComponentThemeObject<DividerRecipe>
      | ComponentThemeFn<DividerOwnerState, DividerRecipe>
    defaultProps?: DividerProps<ElementType>
  }
  Avatar?: {
    styleOverrides?:
      | ComponentThemeObject<AvatarRecipe>
      | ComponentThemeFn<AvatarOwnerState, AvatarRecipe>
    defaultProps?: AvatarProps<ElementType>
  }
  Checkbox?: {
    styleOverrides?:
      | ComponentThemeObject<CheckboxRecipe>
      | ComponentThemeFn<CheckboxOwnerState, CheckboxRecipe>
    defaultProps?: CheckboxProps<ElementType>
  }
  Switch?: {
    styleOverrides?:
      | ComponentThemeObject<SwitchRecipe>
      | ComponentThemeFn<SwitchOwnerState, SwitchRecipe>
    defaultProps?: SwitchProps<ElementType>
  }
}

export type ComponentNames = keyof ComponentThemes
