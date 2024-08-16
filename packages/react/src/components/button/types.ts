import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
} from 'react'
import type { ButtonVariants, ColorPalette } from '../../theme'

type MergedHTMLAttributes = ButtonHTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLElement>

interface InnerButtonProps extends MergedHTMLAttributes, ButtonVariants {
  children?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  color?: ColorPalette
}

export interface ButtonPropsVariantOverrides {}

export interface ButtonProps
  extends InnerButtonProps,
    ButtonPropsVariantOverrides {}
