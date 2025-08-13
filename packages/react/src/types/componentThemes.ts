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
  DialogRootRecipe,
  DialogContentRecipe,
  DialogHeaderRecipe,
  DialogBodyRecipe,
  DialogFooterRecipe,
  DrawerRootRecipe,
  DrawerContentRecipe,
  DrawerHeaderRecipe,
  DrawerBodyRecipe,
  DrawerFooterRecipe,
  RadioRecipe,
  RadioGroupRecipe,
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
  DrawerProps,
  DrawerBodyOwnerState,
  DrawerBodyProps,
  DrawerContentOwnerState,
  DrawerContentProps,
  DrawerFooterOwnerState,
  DrawerFooterProps,
  DrawerHeaderOwnerState,
  DrawerHeaderProps,
  DrawerOwnerState,
  RadioOwnerState,
  RadioProps,
  RadioGroupOwnerState,
  RadioGroupProps,
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
      | ComponentThemeObject<DialogRootRecipe>
      | ComponentThemeFn<DialogOwnerState, DialogRootRecipe>
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
  Drawer?: {
    styleOverrides?:
      | ComponentThemeObject<DrawerRootRecipe>
      | ComponentThemeFn<DrawerOwnerState, DrawerRootRecipe>
    defaultProps?: DrawerProps
  }
  DrawerContent?: {
    styleOverrides?:
      | ComponentThemeObject<DrawerContentRecipe>
      | ComponentThemeFn<DrawerContentOwnerState, DrawerContentRecipe>
    defaultProps?: DrawerContentProps
  }
  DrawerHeader?: {
    styleOverrides?:
      | ComponentThemeObject<DrawerHeaderRecipe>
      | ComponentThemeFn<DrawerHeaderOwnerState, DrawerHeaderRecipe>
    defaultProps?: DrawerHeaderProps
  }
  DrawerBody?: {
    styleOverrides?:
      | ComponentThemeObject<DrawerBodyRecipe>
      | ComponentThemeFn<DrawerBodyOwnerState, DrawerBodyRecipe>
    defaultProps?: DrawerBodyProps
  }
  DrawerFooter?: {
    styleOverrides?:
      | ComponentThemeObject<DrawerFooterRecipe>
      | ComponentThemeFn<DrawerFooterOwnerState, DrawerFooterRecipe>
    defaultProps?: DrawerFooterProps
  }
  Radio?: {
    styleOverrides?:
      | ComponentThemeObject<RadioRecipe>
      | ComponentThemeFn<RadioOwnerState, RadioRecipe>
    defaultProps?: RadioProps
  }
  RadioGroup?: {
    styleOverrides?:
      | ComponentThemeObject<RadioGroupRecipe>
      | ComponentThemeFn<RadioGroupOwnerState, RadioGroupRecipe>
    defaultProps?: RadioGroupProps
  }
}

export type ComponentNames = keyof ComponentThemes
