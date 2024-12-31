import type {
  ReactNode,
  ElementType,
  ComponentPropsWithRef,
  InputHTMLAttributes,
} from 'react'
import type { InputTextVariants, InputTextSlots } from '../../theme/recipes'
import type { ComponentUtilityClasses, Overwrite, CommonProps } from '../types'

export interface InputTextPropsOverrides {}

type InputTextOwnProps<
  InputComponent extends ElementType,
  InputComponentProps extends ComponentPropsWithRef<InputComponent>,
> = Overwrite<
  {
    defaultValue?: string
    prefix?: ReactNode
    suffix?: ReactNode
    value?: string
    clearable?: boolean
    onClear?: () => void
    ref?: InputComponentProps['ref']
    onChange?: InputComponentProps['onChange']
    onBlur?: InputComponentProps['onBlur']
    onFocus?: InputComponentProps['onFocus']
    onKeyUp?: InputComponentProps['onKeyUp']
    onKeyDown?: InputComponentProps['onKeyDown']
    placeholder?: string
    type?: InputHTMLAttributes<InputComponent>['type']
    id?: string
    className?: string
    classes?: ComponentUtilityClasses<
      InputTextOwnerState<InputComponent>,
      InputTextSlots
    >
  } & InputTextVariants &
    CommonProps<InputComponent>,
  InputTextPropsOverrides
>

export type InputTextProps<InputComponent extends ElementType = 'input'> =
  InputTextOwnProps<InputComponent, ComponentPropsWithRef<InputComponent>>

export type InputTextOwnerState<InputComponent extends ElementType = 'input'> =
  InputTextProps<InputComponent>
