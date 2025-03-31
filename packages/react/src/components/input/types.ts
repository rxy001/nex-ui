import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { InputVariants } from '../../theme/slotRecipes'
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
  clearable?: boolean
  onClear?: () => void
  classes?: ComponentUtilityClasses<'root' | 'input' | 'clearBtn'>
  slotProps?: InputSlotProps<InputComponent>
  className?: ClassValue
  as?: InputComponent
  sx?: SxProps<InputOwnerState<InputComponent>>
} & InputVariants

export type InputProps<InputComponent extends ElementType = 'input'> =
  OverrideProps<
    InputComponent,
    InputOwnProps<InputComponent>,
    InputPropsOverrides
  >

export type InputOwnerState<InputComponent extends ElementType = 'input'> =
  InputProps<InputComponent>
