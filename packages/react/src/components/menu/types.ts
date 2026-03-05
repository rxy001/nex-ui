import type { ReactNode } from 'react'
import type {
  PopperAnchorProps,
  PopperContentProps,
  PopperMotionProps,
  PopperPortalProps,
  PopperProps,
} from '../popper'
import type { SlotProps } from '../../types/utils'

// ----------------- MenuProps -----------------
export interface MenuImplProps extends PopperProps {}

export interface MenuProps extends MenuImplProps {}

export interface SubMenuProps extends MenuImplProps {}

// ----------------- MenuPortalProps -----------------
export interface MenuPortalProps extends PopperPortalProps {}

// ----------------- MenuTriggerProps -----------------
export interface MenuTriggerProps extends PopperAnchorProps {
  closeOnClick?: boolean
}

// ----------------- MenuContentProps -----------------
type MenuContentOwnProps = {
  restoreFocus?: boolean
  loopFocus?: boolean
}

export type MenuContentImplProps = PopperContentProps & MenuContentOwnProps

export type MenuContentProps = MenuContentImplProps

export type SubMenuContentProps = Omit<
  MenuContentProps,
  'restoreFocus' | 'placement' | 'closeOnEscape'
>

// ----------------- MenuItemProps -----------------
type MenuItemOwnProps = {
  disabled?: boolean
  closeOnClick?: boolean
}

export type MenuItemProps = SlotProps<'div', MenuItemOwnProps>

// ----------------- MenuSeparatorProps -----------------
export type MenuSeparatorProps = SlotProps<'hr'>

// ----------------- MenuItemGroupProps -----------------
export type MenuItemGroupProps = SlotProps<'div'>

// ----------------- MenuRadioItemGroupProps -----------------
export type MenuRadioItemGroupProps<
  T extends string | number = string | number,
> = MenuItemGroupProps & {
  value?: T
  onValueChange?: (value: T) => void
}

// ----------------- MenuRadioItemProps -----------------
export type MenuRadioItemProps = MenuItemProps & {
  value?: string | number
  onSelect?: () => void
}

// ----------------- MenuCheckboxItemGroupProps -----------------
export type MenuCheckboxItemGroupProps<
  T extends string | number = string | number,
> = MenuItemGroupProps & {
  value?: T[]
  onValueChange?: (value: T[]) => void
}

// ----------------- MenuCheckboxItemProps -----------------
export type MenuCheckboxItemProps = MenuItemProps & {
  value?: string | number
  onCheckedChange?: (checked: boolean) => void
}

export type MenuItemGroupLabelProps = SlotProps<'div'>

// ----------------- MenuMotionProps -----------------
export interface MenuMotionProps extends PopperMotionProps {}

// ----------------- MenuTriggerItemProps -----------------
interface MenuTriggerItemOwnProps {
  disabled?: boolean
}

export type MenuTriggerItemProps = SlotProps<'div', MenuTriggerItemOwnProps>

// ----------------- MenuItemIndicatorProps -----------------
export interface MenuItemIndicatorProps {
  children?: ReactNode
}
