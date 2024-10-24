import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import type { ComponentColor, NexStyledComponentProps } from '../../theme/types'
import type { ButtonVariants } from '../../theme/styles'
import type { ComponentUtilityClasses } from '../type'

type MergedHTMLAttributes = ButtonHTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLElement>

export interface ButtonOwnerState extends MergedHTMLAttributes, ButtonVariants {
  startIcon?: ReactNode
  endIcon?: ReactNode
  color?: ComponentColor
  classes?: ComponentUtilityClasses<
    ButtonOwnerState,
    'root' | 'startIcon' | 'endIcon'
  >
}

export interface ButtonProps
  extends NexStyledComponentProps<ButtonOwnerState> {}
