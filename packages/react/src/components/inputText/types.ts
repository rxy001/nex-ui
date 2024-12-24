import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputTextVariants } from '../../theme/recipes'
import type { ComponentUtilityClasses, StyledComponentProps } from '../types'

// eslint-disable-next-line no-use-before-define
export interface InputTextOwnerState extends InputTextProps {}

export interface InputTextProps
  extends StyledComponentProps<
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> &
      InputTextVariants
  > {
  classes?: ComponentUtilityClasses<InputTextOwnerState, 'root' | 'input'>
  defaultValue?: string
  prefix?: ReactNode
  suffix?: ReactNode
  value?: string
}
