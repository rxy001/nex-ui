import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
} from 'react'
import type { ColorPalette } from '@nex-ui/system'
import type { ButtonVariants } from '../../theme'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariants & {
    children?: ReactNode
    startIcon?: ReactNode
    endIcon?: ReactNode
    style?: CSSProperties
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    color?: ColorPalette
  }

export type ButtonIconProps = {
  children?: ReactNode
  size?: ButtonProps['size']
  spin?: boolean
}
