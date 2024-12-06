import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'
import type { ButtonVariants } from '../../theme/recipes'

import type { ComponentUtilityClasses, StyledComponentProps } from '../types'

export interface ButtonProps
  extends StyledComponentProps<
    ButtonHTMLAttributes<HTMLElement> &
      AnchorHTMLAttributes<HTMLElement> &
      ButtonVariants
  > {
  startIcon?: ReactNode
  endIcon?: ReactNode
  classes?: ComponentUtilityClasses<
    // eslint-disable-next-line no-use-before-define
    ButtonOwnerState,
    'root' | 'startIcon' | 'endIcon'
  >
}

export interface ButtonOwnerState extends ButtonProps {}
