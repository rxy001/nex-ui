import type { ReactNode, ElementType } from 'react'
import type {
  PopperAnchorProps,
  PopperContentProps,
  PopperMotionProps,
  PopperPortalProps,
  PopperProps,
} from '../popper'
import type { SlotProps } from '../../types/utils'
import type { DividerProps } from '../divider'

// ----------------- MenuProps -----------------
export interface MenuProps extends PopperProps {}

// ----------------- MenuPortalProps -----------------
export interface MenuPortalProps extends PopperPortalProps {}

// ----------------- MenuTriggerProps -----------------
export interface MenuTriggerProps extends PopperAnchorProps {
  closeOnClick?: boolean
}

// ----------------- MenuContentProps -----------------
type MenuContentOwnProps = {
  restoreFocus?: boolean
  loop?: boolean
}

export type MenuContentProps<ContentComponent extends ElementType = 'div'> =
  PopperContentProps<ContentComponent> & MenuContentOwnProps

// ----------------- MenuItemProps -----------------
type MenuItemOwnProps = {
  disabled?: boolean
  closeOnClick?: boolean
}

export type MenuItemProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent, MenuItemOwnProps>

// ----------------- MenuSeparatorProps -----------------
export type MenuSeparatorProps<RootComponent extends ElementType = 'hr'> =
  DividerProps<RootComponent>

// ----------------- MenuItemGroupProps -----------------
export type MenuItemGroupProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent>

// ----------------- MenuRadioItemGroupProps -----------------
export type MenuRadioItemGroupProps<
  T extends string | number,
  RootComponent extends ElementType = 'div',
> = MenuItemGroupProps<RootComponent> & {
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
}

// ----------------- MenuRadioItemProps -----------------
export type MenuRadioItemProps<
  T extends string | number,
  RootComponent extends ElementType = 'div',
> = MenuItemProps<RootComponent> & {
  value?: T
}

// ----------------- MenuCheckboxItemGroupProps -----------------
export type MenuCheckboxItemGroupProps<
  T extends string | number,
  RootComponent extends ElementType = 'div',
> = MenuItemGroupProps<RootComponent> & {
  value?: T[]
  defaultValue?: T[]
  onValueChange?: (value: T[]) => void
}

// ----------------- MenuCheckboxItemProps -----------------
export type MenuCheckboxItemProps<
  T extends string | number,
  RootComponent extends ElementType = 'div',
> = MenuItemProps<RootComponent> & {
  value?: T
}

export type MenuItemGroupLabelProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent>

// ----------------- MenuMotionProps -----------------
export interface MenuMotionProps extends PopperMotionProps {}

// ----------------- MenuTriggerItemProps -----------------
interface MenuTriggerItemOwnProps {
  disabled?: boolean
}

export type MenuTriggerItemProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent, MenuTriggerItemOwnProps>

// ----------------- MenuItemIndicatorProps -----------------
export interface MenuItemIndicatorProps {
  children?: ReactNode
}
