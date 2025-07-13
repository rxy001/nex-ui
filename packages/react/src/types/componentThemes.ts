import type {
  DividerRecipe,
  FlexRecipe,
  IconRecipe,
  AvatarRecipe,
  AvatarGroupRecipe,
  ButtonRecipe,
  InputRecipe,
  CheckboxRecipe,
  CheckboxGroupRecipe,
  SwitchRecipe,
  AccordionRecipe,
  AccordionItemRecipe,
  DialogRecipe,
  DialogContentRecipe,
  DialogHeaderRecipe,
  DialogBodyRecipe,
  DialogFooterRecipe,
} from '../theme/recipes'
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
  CheckboxProps,
  CheckboxOwnerState,
  SwitchProps,
  SwitchOwnerState,
  AccordionProps,
  AccordionOwnerState,
  AccordionItemProps,
  AvatarGroupProps,
  CheckboxGroupProps,
  CheckboxGroupOwnerState,
  DialogProps,
  DialogBodyOwnerState,
  DialogBodyProps,
  DialogContentOwnerState,
  DialogContentProps,
  DialogFooterOwnerState,
  DialogFooterProps,
  DialogHeaderOwnerState,
  DialogHeaderProps,
  DialogOwnerState,
} from '../components'
import type { IconProps } from '../components/icon/types'
import type { ComponentThemeObject, ComponentThemeFn } from './utils'

export type ComponentThemes = {
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
    defaultProps?: IconProps
  }
  Flex?: {
    styleOverrides?:
      | ComponentThemeObject<FlexRecipe>
      | ComponentThemeFn<FlexOwnerState, FlexRecipe>
    defaultProps?: FlexProps
  }
  Input?: {
    styleOverrides?:
      | ComponentThemeObject<InputRecipe>
      | ComponentThemeFn<InputOwnerState, InputRecipe>
    defaultProps?: InputProps
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
  AvatarGroup?: {
    styleOverrides?:
      | ComponentThemeObject<AvatarGroupRecipe>
      | ComponentThemeFn<AvatarOwnerState, AvatarGroupRecipe>
    defaultProps?: AvatarGroupProps
  }
  Checkbox?: {
    styleOverrides?:
      | ComponentThemeObject<CheckboxRecipe>
      | ComponentThemeFn<CheckboxOwnerState, CheckboxRecipe>
    defaultProps?: CheckboxProps
  }
  CheckboxGroup?: {
    styleOverrides?:
      | ComponentThemeObject<CheckboxGroupRecipe>
      | ComponentThemeFn<CheckboxGroupOwnerState, CheckboxGroupRecipe>
    defaultProps?: CheckboxGroupProps
  }
  Switch?: {
    styleOverrides?:
      | ComponentThemeObject<SwitchRecipe>
      | ComponentThemeFn<SwitchOwnerState, SwitchRecipe>
    defaultProps?: SwitchProps
  }
  Accordion?: {
    styleOverrides?:
      | ComponentThemeObject<AccordionRecipe>
      | ComponentThemeFn<AccordionOwnerState, AccordionRecipe>
    defaultProps?: AccordionProps
  }
  AccordionItem?: {
    styleOverrides?:
      | ComponentThemeObject<AccordionItemRecipe>
      | ComponentThemeFn<AccordionOwnerState, AccordionItemRecipe>
    defaultProps?: AccordionItemProps
  }
  Dialog?: {
    styleOverrides?:
      | ComponentThemeObject<DialogRecipe>
      | ComponentThemeFn<DialogOwnerState, DialogRecipe>
    defaultProps?: DialogProps
  }
  DialogContent?: {
    styleOverrides?:
      | ComponentThemeObject<DialogContentRecipe>
      | ComponentThemeFn<DialogContentOwnerState, DialogContentRecipe>
    defaultProps?: DialogContentProps
  }
  DialogHeader?: {
    styleOverrides?:
      | ComponentThemeObject<DialogHeaderRecipe>
      | ComponentThemeFn<DialogHeaderOwnerState, DialogHeaderRecipe>
    defaultProps?: DialogHeaderProps
  }
  DialogBody?: {
    styleOverrides?:
      | ComponentThemeObject<DialogBodyRecipe>
      | ComponentThemeFn<DialogBodyOwnerState, DialogBodyRecipe>
    defaultProps?: DialogBodyProps
  }
  DialogFooter?: {
    styleOverrides?:
      | ComponentThemeObject<DialogFooterRecipe>
      | ComponentThemeFn<DialogFooterOwnerState, DialogFooterRecipe>
    defaultProps?: DialogFooterProps
  }
}

export type ComponentNames = keyof ComponentThemes
