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
  AlertRecipe,
  CardRecipe,
  CardHeaderRecipe,
  CardBodyRecipe,
  CardFooterRecipe,
  CardActionAreaRecipe,
  TooltipRecipe,
} from '../theme/recipes'
import type {
  ButtonProps,
  FlexProps,
  InputProps,
  DividerProps,
  AvatarProps,
  CheckboxProps,
  SwitchProps,
  AccordionProps,
  AccordionItemProps,
  AvatarGroupProps,
  CheckboxGroupProps,
  DialogProps,
  DialogBodyProps,
  DialogContentProps,
  DialogFooterProps,
  DialogHeaderProps,
  DrawerProps,
  DrawerBodyProps,
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  RadioProps,
  RadioGroupProps,
  AlertProps,
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardActionAreaProps,
  TooltipProps,
} from '../components'
import type { IconProps } from '../components/icon/types'
import type { ComponentThemeObject } from './utils'

export type ComponentThemes = {
  Button?: {
    styleOverrides?: ComponentThemeObject<ButtonRecipe>
    defaultProps?: ButtonProps
  }
  Icon?: {
    styleOverrides?: ComponentThemeObject<IconRecipe>
    defaultProps?: IconProps
  }
  Flex?: {
    styleOverrides?: ComponentThemeObject<FlexRecipe>
    defaultProps?: FlexProps
  }
  Input?: {
    styleOverrides?: ComponentThemeObject<InputRecipe>
    defaultProps?: InputProps
  }
  Divider?: {
    styleOverrides?: ComponentThemeObject<DividerRecipe>
    defaultProps?: DividerProps
  }
  Avatar?: {
    styleOverrides?: ComponentThemeObject<AvatarRecipe>
    defaultProps?: AvatarProps
  }
  AvatarGroup?: {
    styleOverrides?: ComponentThemeObject<AvatarGroupRecipe>
    defaultProps?: AvatarGroupProps
  }
  Checkbox?: {
    styleOverrides?: ComponentThemeObject<CheckboxRecipe>
    defaultProps?: CheckboxProps
  }
  CheckboxGroup?: {
    styleOverrides?: ComponentThemeObject<CheckboxGroupRecipe>
    defaultProps?: CheckboxGroupProps
  }
  Switch?: {
    styleOverrides?: ComponentThemeObject<SwitchRecipe>
    defaultProps?: SwitchProps
  }
  Accordion?: {
    styleOverrides?: ComponentThemeObject<AccordionRecipe>
    defaultProps?: AccordionProps
  }
  AccordionItem?: {
    styleOverrides?: ComponentThemeObject<AccordionItemRecipe>
    defaultProps?: AccordionItemProps
  }
  Dialog?: {
    styleOverrides?: ComponentThemeObject<DialogRootRecipe>
    defaultProps?: DialogProps
  }
  DialogContent?: {
    styleOverrides?: ComponentThemeObject<DialogContentRecipe>
    defaultProps?: DialogContentProps
  }
  DialogHeader?: {
    styleOverrides?: ComponentThemeObject<DialogHeaderRecipe>
    defaultProps?: DialogHeaderProps
  }
  DialogBody?: {
    styleOverrides?: ComponentThemeObject<DialogBodyRecipe>
    defaultProps?: DialogBodyProps
  }
  DialogFooter?: {
    styleOverrides?: ComponentThemeObject<DialogFooterRecipe>
    defaultProps?: DialogFooterProps
  }
  Drawer?: {
    styleOverrides?: ComponentThemeObject<DrawerRootRecipe>
    defaultProps?: DrawerProps
  }
  DrawerContent?: {
    styleOverrides?: ComponentThemeObject<DrawerContentRecipe>
    defaultProps?: DrawerContentProps
  }
  DrawerHeader?: {
    styleOverrides?: ComponentThemeObject<DrawerHeaderRecipe>
    defaultProps?: DrawerHeaderProps
  }
  DrawerBody?: {
    styleOverrides?: ComponentThemeObject<DrawerBodyRecipe>
    defaultProps?: DrawerBodyProps
  }
  DrawerFooter?: {
    styleOverrides?: ComponentThemeObject<DrawerFooterRecipe>
    defaultProps?: DrawerFooterProps
  }
  Radio?: {
    styleOverrides?: ComponentThemeObject<RadioRecipe>
    defaultProps?: RadioProps
  }
  RadioGroup?: {
    styleOverrides?: ComponentThemeObject<RadioGroupRecipe>
    defaultProps?: RadioGroupProps
  }
  Alert?: {
    styleOverrides?: ComponentThemeObject<AlertRecipe>
    defaultProps?: AlertProps
  }
  Card?: {
    styleOverrides?: ComponentThemeObject<CardRecipe>
    defaultProps?: CardProps
  }
  CardHeader?: {
    styleOverrides?: ComponentThemeObject<CardHeaderRecipe>
    defaultProps?: CardHeaderProps
  }
  CardBody?: {
    styleOverrides?: ComponentThemeObject<CardBodyRecipe>
    defaultProps?: CardBodyProps
  }
  CardFooter?: {
    styleOverrides?: ComponentThemeObject<CardFooterRecipe>
    defaultProps?: CardFooterProps
  }
  CardActionArea?: {
    styleOverrides?: ComponentThemeObject<CardActionAreaRecipe>
    defaultProps?: CardActionAreaProps
  }
  Tooltip?: {
    styleOverrides?: ComponentThemeObject<TooltipRecipe>
    defaultProps?: TooltipProps
  }
}

export type ComponentNames = keyof ComponentThemes
