import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { InputVariants } from '../../theme/recipes'
import type {
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
} from '../../types/utils'
import type { ButtonProps } from '../button'

export interface InputPropsOverrides {}

type InputSlotProps<InputComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<'label', InputOwnerState<InputComponent>>
  input?: ComponentPropsWithCommonProps<
    'input',
    InputOwnerState<InputComponent>
  >
  clearBtn?: ButtonProps
}

type InputOwnProps<InputComponent extends ElementType> = {
  prefix?: ReactNode
  suffix?: ReactNode
  onClear?: () => void
  classes?: ComponentUtilityClasses<'root' | 'input' | 'clearBtn'>
  slotProps?: InputSlotProps<InputComponent>
  className?: ClassValue
  as?: InputComponent
  sx?: SxProps<InputOwnerState<InputComponent>>
  disabled?: boolean
  fullWidth?: boolean
  error?: boolean
  clearable?: boolean
  size?: InputVariants['size']
  variant?: InputVariants['variant']
  color?: InputVariants['color']
  radius?: InputVariants['radius']
}

export type InputProps<InputComponent extends ElementType = 'input'> =
  OverrideProps<
    InputComponent,
    InputOwnProps<InputComponent>,
    InputPropsOverrides
  >

export type InputOwnerState<InputComponent extends ElementType = 'input'> =
  InputProps<InputComponent>
