import type { ElementType, ReactNode } from 'react'
import type { Interpolation, CSSObject } from '@nex-ui/system'
import type { HTMLMotionProps } from 'motion/react'
import type { ClassValue } from 'clsx'
import type {
  MenuCheckboxItemGroupProps,
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuItemProps,
  MenuPortalProps,
  MenuProps,
  MenuRadioItemGroupProps,
  MenuRadioItemProps,
  MenuTriggerProps,
  SubMenuContentProps,
  SubMenuProps,
} from '../menu'
import type {
  OverrideProps,
  SlotProps,
  Overwrite,
  ComponentSlotClasses,
} from '../../types/utils'
import type {
  DropdownContentVariants,
  DropdownItemVariants,
  SubDropdownContentVariants,
} from '../../themes/recipes'
import type { Placement } from '../utils'

// ------------- Dropdown --------------
interface DropdownOwnProps extends MenuProps {
  defaultOpen?: boolean
}
export interface DropdownPropsOverrides {}
export interface DropdownProps
  extends DropdownOwnProps,
    DropdownPropsOverrides {}

// ------------- DropdownContent --------------
interface DropdownSlotProps {
  paper: SlotProps<'div'>
}

interface DropdownContentOwnProps<RootComponent extends ElementType = 'div'>
  extends Pick<MenuPortalProps, 'container'>,
    Pick<
      MenuContentProps,
      | 'restoreFocus'
      | 'loopFocus'
      | 'closeOnDetached'
      | 'closeOnEscape'
      | 'flip'
      | 'placement'
      | 'offset'
      | 'shift'
    >,
    Pick<DropdownItemOwnProps, 'color' | 'variant'> {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * If true, disables the animation for the Dropdown.
   *
   * @default false
   */
  disableAnimation?: boolean

  /**
   * If true, keeps the Dropdown mounted in the DOM when it's closed.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * The props used for each slot.
   */
  slotProps?: DropdownSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof DropdownSlotProps>

  /**
   * The minimum width of the Dropdown.
   */
  minWidth?: CSSObject['minWidth']

  /**
   * The width of the Dropdown.
   */
  width?: CSSObject['width']

  /**
   * The maximum width of the Dropdown.
   */
  maxWidth?: CSSObject['maxWidth']

  /**
   * The minimum height of the Dropdown.
   */
  minHeight?: CSSObject['minHeight']

  /**
   * The height of the Dropdown.
   */
  height?: CSSObject['height']

  /**
   * The maximum height of the Dropdown.
   */
  maxHeight?: CSSObject['maxHeight']

  /**
   * The border radius of the Dropdown.
   *
   * @default 'md'
   */
  radius?: DropdownContentVariants['radius']

  /**
   * The size of the Dropdown.
   *
   * @default 'md'
   */
  size?: DropdownContentVariants['size']
}

export interface DropdownContentPropsOverrides {}
export type DropdownContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DropdownContentOwnProps<RootComponent>,
    DropdownContentPropsOverrides
  >

// ------------- DropdownTrigger --------------
export interface DropdownTriggerProps extends MenuTriggerProps {}

// ------------- DropdownItem --------------
interface DropdownItemSlotProps {
  shortcut?: SlotProps<'kbd'>
  startIcon?: SlotProps<'span'>
  endIcon?: SlotProps<'span'>
  content?: SlotProps<'span'>
}

interface DropdownItemOwnProps<RootComponent extends ElementType = 'div'>
  extends Pick<
    MenuItemProps,
    'closeOnSelect' | 'disabled' | 'onSelect' | 'textValue'
  > {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * Shortcut hint content displayed on the right side.
   */
  shortcut?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: DropdownItemSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof DropdownItemSlotProps>

  /**
   * The color used when DropdownItem is highlighted.
   *
   * @default 'gray'
   */
  color?: DropdownItemVariants['color']

  /**
   * The style used when DropdownItem is highlighted.
   *
   * @default 'solid'
   */
  variant?: DropdownItemVariants['variant']

  /**
   * The element placed before the children.
   */
  startIcon?: ReactNode

  /**
   * The element placed after the children.
   */
  endIcon?: ReactNode
}

export interface DropdownItemPropsOverrides {}
export type DropdownItemProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DropdownItemOwnProps<RootComponent>,
    DropdownItemPropsOverrides
  >

// ------------- DropdownItemGroup --------------
interface DropdownItemGroupOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export interface DropdownItemGroupPropsOverrides {}
export type DropdownItemGroupProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DropdownItemGroupOwnProps<RootComponent>,
    DropdownItemGroupPropsOverrides
  >

// ------------- DropdownItemGroupLabel --------------
interface DropdownItemGroupLabelOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export interface DropdownItemGroupLabelPropsOverrides {}
export type DropdownItemGroupLabelProps<
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  DropdownItemGroupLabelOwnProps<RootComponent>,
  DropdownItemGroupLabelPropsOverrides
>

// ------------- DropdownRadioItemGroup --------------
type DropdownRadioItemGroupOwnProps<Value extends string | number> = Pick<
  MenuRadioItemGroupProps<Value>,
  'value' | 'onValueChange'
>

export interface DropdownRadioItemGroupPropsOverrides {}
export type DropdownRadioItemGroupProps<
  Value extends string | number = string | number,
  RootComponent extends ElementType = 'div',
> = Overwrite<
  DropdownItemGroupProps<RootComponent>,
  DropdownRadioItemGroupOwnProps<Value> & DropdownRadioItemGroupPropsOverrides
>

// ------------- DropdownRadioItem --------------
interface DropdownRadioItemSlotProps extends DropdownItemSlotProps {
  indicator?: SlotProps<'span'>
}

interface DropdownRadioItemOwnProps<RootComponent extends ElementType>
  extends Omit<DropdownItemOwnProps<RootComponent>, 'slotProps' | 'classNames'>,
    Pick<MenuRadioItemProps, 'value'> {
  /**
   * The props used for each slot.
   */
  slotProps?: DropdownRadioItemSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof DropdownRadioItemSlotProps>

  /**
   * Custom selected-state indicator for DropdownRadioItem.
   */
  indicator?: ReactNode
}

export interface DropdownRadioItemPropsOverrides {}
export type DropdownRadioItemProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DropdownRadioItemOwnProps<RootComponent>,
    DropdownRadioItemPropsOverrides
  >

// ------------- DropdownCheckboxItemGroup --------------
type DropdownCheckboxItemGroupOwnProps<Value extends string | number> = Pick<
  MenuCheckboxItemGroupProps<Value>,
  'value' | 'onValueChange'
>

export interface DropdownCheckboxItemGroupPropsOverrides {}
export type DropdownCheckboxItemGroupProps<
  Value extends string | number = string | number,
  RootComponent extends ElementType = 'div',
> = Overwrite<
  DropdownItemGroupProps<RootComponent>,
  DropdownCheckboxItemGroupOwnProps<Value> &
    DropdownCheckboxItemGroupPropsOverrides
>

// ------------- DropdownCheckboxItem --------------
interface DropdownCheckboxItemSlotProps extends DropdownItemSlotProps {
  indicator?: SlotProps<'span'>
}

interface DropdownCheckboxItemOwnProps<RootComponent extends ElementType>
  extends Omit<DropdownItemOwnProps<RootComponent>, 'slotProps'>,
    Pick<MenuCheckboxItemProps, 'value' | 'onCheckedChange'> {
  /**
   * The props used for each slot.
   */
  slotProps?: DropdownCheckboxItemSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof DropdownCheckboxItemSlotProps>

  /**
   * Custom selected-state indicator for DropdownCheckboxItem.
   */
  indicator?: ReactNode
}

export interface DropdownCheckboxItemPropsOverrides {}
export type DropdownCheckboxItemProps<
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  DropdownCheckboxItemOwnProps<RootComponent>,
  DropdownCheckboxItemPropsOverrides
>

// ------------- DropdownTriggerItem --------------
export interface DropdownTriggerItemPropsOverrides {}

type DropdownTriggerItemOwnProps<RootComponent extends ElementType> =
  DropdownItemOwnProps<RootComponent>

export type DropdownTriggerItemProps<
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  DropdownTriggerItemOwnProps<RootComponent>,
  DropdownTriggerItemPropsOverrides
>

// ------------- SubDropdown --------------
interface SubDropdownOwnProps extends SubMenuProps {
  defaultOpen?: boolean
}

export interface SubDropdownPropsOverrides {}
export interface SubDropdownProps
  extends SubDropdownOwnProps,
    SubDropdownPropsOverrides {}

// ------------- SubDropdownContent --------------
interface SubDropdownContentSlotProps {
  paper: SlotProps<'div'>
}

interface SubDropdownContentOwnProps<RootComponent extends ElementType>
  extends Pick<MenuPortalProps, 'container'>,
    Pick<
      SubMenuContentProps,
      'loopFocus' | 'closeOnDetached' | 'flip' | 'offset' | 'shift'
    >,
    Pick<DropdownItemOwnProps, 'color' | 'variant'> {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * If true, disables the animation for the SubDropdown.
   *
   * @default false
   */
  disableAnimation?: boolean

  /**
   * If true, keeps the SubDropdown mounted in the DOM when it's closed.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * The props used for each slot.
   */
  slotProps?: SubDropdownContentSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof SubDropdownContentSlotProps>

  /**
   * The minimum width of the SubDropdown.
   */
  minWidth?: CSSObject['minWidth']

  /**
   * The width of the SubDropdown.
   */
  width?: CSSObject['width']

  /**
   * The maximum width of the SubDropdown.
   */
  maxWidth?: CSSObject['maxWidth']

  /**
   * The minimum height of the SubDropdown.
   */
  minHeight?: CSSObject['minHeight']

  /**
   * The height of the SubDropdown.
   */
  height?: CSSObject['height']

  /**
   * The maximum height of the SubDropdown.
   */
  maxHeight?: CSSObject['maxHeight']

  /**
   * The border radius of the SubDropdown.
   *
   * @default 'md'
   */
  radius?: SubDropdownContentVariants['radius']

  /**
   * The size of the SubDropdown.
   *
   * @default 'md'
   */
  size?: SubDropdownContentVariants['size']
}

export interface SubDropdownContentPropsOverrides {}
export type SubDropdownContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    SubDropdownContentOwnProps<RootComponent>,
    SubDropdownContentPropsOverrides
  >

// ------------- DropdownDivider --------------
interface DropdownDividerOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   * @default 'hr'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export interface DropdownDividerPropsOverrides {}

export type DropdownDividerProps<RootComponent extends ElementType = 'hr'> =
  OverrideProps<
    RootComponent,
    DropdownDividerOwnProps<RootComponent>,
    DropdownDividerPropsOverrides
  >

// ------------- DropdownPaperMotionProps --------------
export interface DropdownPaperMotionProps {
  children?: ReactNode
  placement?: Placement
  motionProps?: DropdownContentOwnProps['motionProps']
  onAnimationStart?: HTMLMotionProps<'div'>['onAnimationStart']
  onAnimationComplete?: HTMLMotionProps<'div'>['onAnimationComplete']
}
