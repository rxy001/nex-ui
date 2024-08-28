import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  CSSProperties,
} from 'react'
import type { ButtonVariants, ColorPalette } from '../../theme'
import type { ComponentClasses } from '../type'

type MergedHTMLAttributes = ButtonHTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLElement>

interface InnerButtonProps extends MergedHTMLAttributes, ButtonVariants {
  children?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  style?: CSSProperties
  color?: ColorPalette
  classes?: ComponentClasses<
    // eslint-disable-next-line no-use-before-define
    ButtonProps,
    'root' | 'startIcon' | 'endIcon'
  >
}

export interface ButtonPropsVariantOverrides {}

export interface ButtonProps
  extends InnerButtonProps,
    ButtonPropsVariantOverrides {}
