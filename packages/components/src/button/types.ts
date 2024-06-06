import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
} from 'react'
import type { ButtonVariants } from '@nex-ui/theme'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariants & {
    children?: ReactNode
    startIcon?: ReactNode
    endIcon?: ReactNode
    loading?: boolean
    style?: CSSProperties
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  }

export type ButtonIconProps = {
  children?: ReactNode
  size?: ButtonProps['size']
  spin?: boolean
}
