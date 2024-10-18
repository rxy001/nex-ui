import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import type { StyleObject } from '@nex-ui/system'
import type { ButtonVariants, ComponentColor } from '../../theme'
import type { ComponentClasses } from '../type'

type MergedHTMLAttributes = ButtonHTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLElement>

export interface ButtonProps extends MergedHTMLAttributes, ButtonVariants {
  startIcon?: ReactNode
  endIcon?: ReactNode
  color?: ComponentColor
  sx?: StyleObject
  classes?: ComponentClasses<
    // eslint-disable-next-line no-use-before-define
    ButtonProps,
    'root' | 'startIcon' | 'endIcon'
  >
}

export interface ButtonOwnerState extends ButtonProps {}
