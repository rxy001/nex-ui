import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
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
import type { DropdownItemVariants } from '../../theme/recipes'
import type { Placement } from '../utils'

// ------------- Dropdown --------------
type DropdownOwnProps = MenuProps & {
  defaultOpen?: boolean
}
export interface DropdownPropsOverrides {}
export type DropdownProps = DropdownOwnProps & DropdownPropsOverrides

// ------------- DropdownContent --------------
type DropdownSlotProps = {
  paper: SlotProps<'div'>
}

type DropdownContentOwnProps<RootComponent extends ElementType = 'div'> = Pick<
  MenuPortalProps,
  'container'
> &
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
  > &
  Pick<DropdownItemOwnProps, 'color' | 'variant'> & {
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
    motionProps?:
      | HTMLMotionProps<'div'>
      | ((placement?: Placement) => HTMLMotionProps<'div'>)

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
    minWidth?: number | string

    /**
     * The maximum height of the Dropdown.
     */
    maxHeight?: number | string
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
type DropdownItemSlotProps = {
  shortcut?: SlotProps<'kbd'>
  startIcon?: SlotProps<'span'>
  endIcon?: SlotProps<'span'>
  content?: SlotProps<'span'>
}

type DropdownItemOwnProps<RootComponent extends ElementType = 'div'> = Pick<
  MenuItemProps,
  'closeOnSelect' | 'disabled' | 'onSelect'
> & {
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
type DropdownItemGroupOwnProps<RootComponent extends ElementType> = {
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
type DropdownItemGroupLabelOwnProps<RootComponent extends ElementType> = {
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
type DropdownRadioItemSlotProps = DropdownItemSlotProps & {
  indicator?: SlotProps<'span'>
}

type DropdownRadioItemOwnProps<RootComponent extends ElementType> = Omit<
  DropdownItemOwnProps<RootComponent>,
  'slotProps' | 'classNames'
> &
  Pick<MenuRadioItemProps, 'value'> & {
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
type DropdownCheckboxItemSlotProps = DropdownItemSlotProps & {
  indicator?: SlotProps<'span'>
}

type DropdownCheckboxItemOwnProps<RootComponent extends ElementType> = Omit<
  DropdownItemOwnProps<RootComponent>,
  'slotProps'
> &
  Pick<MenuCheckboxItemProps, 'value' | 'onCheckedChange'> & {
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
type SubDropdownOwnProps = SubMenuProps & {
  defaultOpen?: boolean
}

export interface SubDropdownPropsOverrides {}
export type SubDropdownProps = SubDropdownOwnProps & SubDropdownPropsOverrides

// ------------- SubDropdownContent --------------
type SubDropdownContentSlotProps = {
  paper: SlotProps<'div'>
}

type SubDropdownContentOwnProps<RootComponent extends ElementType> = Pick<
  MenuPortalProps,
  'container'
> &
  Pick<
    SubMenuContentProps,
    'loopFocus' | 'closeOnDetached' | 'flip' | 'offset' | 'shift'
  > &
  Pick<DropdownItemOwnProps, 'color' | 'variant'> & {
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
     * Use the `variants` API to create your own animation.
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
     * The minimum width of the SubDropdownContent.
     */
    minWidth?: number | string

    /**
     * The maximum height of the SubDropdownContent.
     */
    maxHeight?: number | string
  }

export interface SubDropdownContentPropsOverrides {}
export type SubDropdownContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    SubDropdownContentOwnProps<RootComponent>,
    SubDropdownContentPropsOverrides
  >

// ------------- DropdownDivider --------------
type DropdownDividerOwnProps<RootComponent extends ElementType> = {
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
export type DropdownPaperMotionProps = {
  children?: ReactNode
  placement?: Placement
  motionProps?: DropdownContentOwnProps['motionProps']
  onAnimationStart?: HTMLMotionProps<'div'>['onAnimationStart']
  onAnimationComplete?: HTMLMotionProps<'div'>['onAnimationComplete']
}
