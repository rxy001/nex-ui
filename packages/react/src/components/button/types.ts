import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import type { ButtonVariants, ComponentColor } from '../../theme'
import type { ComponentClasses } from '../type'

type MergedHTMLAttributes = ButtonHTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLElement>

interface InnerButtonProps extends MergedHTMLAttributes, ButtonVariants {
  startIcon?: ReactNode
  endIcon?: ReactNode
  color?: ComponentColor
  classes?: ComponentClasses<
    // eslint-disable-next-line no-use-before-define
    ButtonProps,
    'root' | 'startIcon' | 'endIcon'
  >
}

export interface ButtonProps extends InnerButtonProps {}

export interface ButtonOwnerState extends ButtonProps {}
