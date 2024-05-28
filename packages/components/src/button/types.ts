import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import type { ButtonVariants } from '@ant-ui/theme'

export type UseButtonParameters = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariants

export type ButtonProps = UseButtonParameters & {
  children?: ReactNode
  href?: string
}
