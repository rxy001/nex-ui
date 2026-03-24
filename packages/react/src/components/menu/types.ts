import type { ReactNode, MouseEvent } from 'react'
import type {
  PopperAnchorProps,
  PopperContentProps,
  PopperMotionProps,
  PopperPortalProps,
  PopperProps,
} from '../popper'
import type { SlotProps } from '../../types/utils'

export interface MenuImplProps extends PopperProps {}

// ----------------- MenuProps -----------------
export interface MenuProps extends MenuImplProps {}

// ----------------- SubMenuProps -----------------
export interface SubMenuProps extends MenuImplProps {}

// ----------------- MenuPortalProps -----------------
export interface MenuPortalProps extends PopperPortalProps {}

// ----------------- MenuTriggerProps -----------------
export interface MenuTriggerProps extends PopperAnchorProps {
  closeOnClick?: boolean
}

// ----------------- MenuContentProps -----------------
interface MenuContentOwnProps {
  restoreFocus?: boolean
  loopFocus?: boolean
}

export type MenuContentImplProps = PopperContentProps & MenuContentOwnProps

export interface MenuContentProps extends MenuContentImplProps {}

// ----------------- SubMenuContentProps -----------------
export interface SubMenuContentProps
  extends Omit<
    MenuContentProps,
    'restoreFocus' | 'placement' | 'closeOnEscape'
  > {}

// ----------------- MenuItemProps -----------------
interface MenuItemOwnProps {
  disabled?: boolean
  closeOnSelect?: boolean
  onSelect?: (event: MouseEvent<HTMLDivElement>) => void
}

export interface MenuItemProps extends SlotProps<'div', MenuItemOwnProps> {}

// ----------------- MenuSeparatorProps -----------------
export interface MenuSeparatorProps extends SlotProps<'hr'> {}

// ----------------- MenuItemGroupProps -----------------
export interface MenuItemGroupProps extends SlotProps<'div'> {}

// ----------------- MenuRadioItemGroupProps -----------------
export interface MenuRadioItemGroupProps<
  T extends string | number = string | number,
> extends MenuItemGroupProps {
  value?: T
  onValueChange?: (value: T) => void
}

// ----------------- MenuRadioItemProps -----------------
export interface MenuRadioItemProps extends MenuItemProps {
  value?: string | number
}

// ----------------- MenuCheckboxItemGroupProps -----------------
export interface MenuCheckboxItemGroupProps<
  T extends string | number = string | number,
> extends MenuItemGroupProps {
  value?: T[]
  onValueChange?: (value: T[]) => void
}

// ----------------- MenuCheckboxItemProps -----------------
export interface MenuCheckboxItemProps extends MenuItemProps {
  value?: string | number
  onCheckedChange?: (checked: boolean) => void
}

// ----------------- MenuGroupLabelProps -----------------
export interface MenuItemGroupLabelProps extends SlotProps<'div'> {}

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
