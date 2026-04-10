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
  DialogContentRecipe,
  DialogHeaderRecipe,
  DialogBodyRecipe,
  DialogFooterRecipe,
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
  PopoverContentRecipe,
  BadgeRecipe,
  BreadcrumbRecipe,
  BreadcrumbItemRecipe,
  DropdownItemGroupRecipe,
  DropdownCheckboxItemRecipe,
  DropdownContentRecipe,
  DropdownItemGroupLabelRecipe,
  DropdownItemRecipe,
  DropdownRadioItemRecipe,
  DropdownCheckboxItemGroupRecipe,
  DropdownRadioItemGroupRecipe,
  DropdownTriggerItemRecipe,
  SubDropdownContentRecipe,
  DropdownDividerRecipe,
  TextRecipe,
  HeadingRecipe,
} from '../themes/recipes'
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
  PopoverContentProps,
  PopoverProps,
  BadgeProps,
  BreadcrumbProps,
  BreadcrumbItemProps,
  DropdownProps,
  DropdownCheckboxItemProps,
  DropdownRadioItemProps,
  DropdownItemGroupProps,
  DropdownItemGroupLabelProps,
  DropdownItemProps,
  DropdownContentProps,
  DropdownCheckboxItemGroupProps,
  DropdownRadioItemGroupProps,
  DropdownTriggerItemProps,
  SubDropdownProps,
  SubDropdownContentProps,
  DropdownDividerProps,
  TextProps,
  HeadingProps,
} from '../components'
import type { IconProps } from '../components/icon/types'
import type { ComponentThemeObject } from './utils'

export interface ComponentThemes {
  // ---------------- Typography ----------------
  Text?: {
    styleOverrides?: ComponentThemeObject<TextRecipe>
    defaultProps?: TextProps
  }
  Heading?: {
    styleOverrides?: ComponentThemeObject<HeadingRecipe>
    defaultProps?: HeadingProps
  }
  // ---------------- Components ----------------
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
  Popover?: {
    defaultProps?: PopoverProps
  }
  PopoverContent?: {
    styleOverrides?: ComponentThemeObject<PopoverContentRecipe>
    defaultProps?: PopoverContentProps
  }
  Badge?: {
    styleOverrides?: ComponentThemeObject<BadgeRecipe>
    defaultProps?: BadgeProps
  }
  Breadcrumb?: {
    styleOverrides?: ComponentThemeObject<BreadcrumbRecipe>
    defaultProps?: BreadcrumbProps
  }
  BreadcrumbItem?: {
    styleOverrides?: ComponentThemeObject<BreadcrumbItemRecipe>
    defaultProps?: BreadcrumbItemProps
  }
  Dropdown?: {
    defaultProps?: DropdownProps
  }
  DropdownContent?: {
    styleOverrides?: ComponentThemeObject<DropdownContentRecipe>
    defaultProps?: DropdownContentProps
  }
  DropdownItem?: {
    styleOverrides?: ComponentThemeObject<DropdownItemRecipe>
    defaultProps?: DropdownItemProps
  }
  DropdownItemGroup?: {
    styleOverrides?: ComponentThemeObject<DropdownItemGroupRecipe>
    defaultProps?: DropdownItemGroupProps
  }
  DropdownItemGroupLabel?: {
    styleOverrides?: ComponentThemeObject<DropdownItemGroupLabelRecipe>
    defaultProps?: DropdownItemGroupLabelProps
  }
  DropdownRadioItem?: {
    styleOverrides?: ComponentThemeObject<DropdownRadioItemRecipe>
    defaultProps?: DropdownRadioItemProps
  }
  DropdownRadioItemGroup?: {
    styleOverrides?: ComponentThemeObject<DropdownRadioItemGroupRecipe>
    defaultProps?: DropdownRadioItemGroupProps
  }
  DropdownCheckboxItem?: {
    styleOverrides?: ComponentThemeObject<DropdownCheckboxItemRecipe>
    defaultProps?: DropdownCheckboxItemProps
  }
  DropdownCheckboxItemGroup?: {
    styleOverrides?: ComponentThemeObject<DropdownCheckboxItemGroupRecipe>
    defaultProps?: DropdownCheckboxItemGroupProps
  }
  DropdownTriggerItem?: {
    styleOverrides?: ComponentThemeObject<DropdownTriggerItemRecipe>
    defaultProps?: DropdownTriggerItemProps
  }
  SubDropdown?: {
    defaultProps?: SubDropdownProps
  }
  SubDropdownContent?: {
    styleOverrides?: ComponentThemeObject<SubDropdownContentRecipe>
    defaultProps?: SubDropdownContentProps
  }
  DropdownDivider?: {
    styleOverrides?: ComponentThemeObject<DropdownDividerRecipe>
    defaultProps?: DropdownDividerProps
  }
}

export type ComponentNames = keyof ComponentThemes
