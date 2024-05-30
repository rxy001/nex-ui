import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import type { ButtonVariants } from '@wui/theme'

export type UseButtonParameters = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariants & {
    startIcon?: ReactNode
    endIcon?: ReactNode
    loading?: boolean
  }

export type ButtonProps = UseButtonParameters & {
  children?: ReactNode
}

export type ButtonIconProps = {
  children?: ReactNode
  size?: ButtonProps['size']
  spin?: boolean
}
