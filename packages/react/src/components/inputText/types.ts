import type { ReactNode, ElementType, ComponentPropsWithRef } from 'react'
import type { InputTextVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'
import type { ButtonProps } from '../button'

export interface InputTextPropsOverrides {}

type InputTextSlotProps<InputComponentProps> = {
  root?: ComponentPropsWithRef<'label'>
  input?: InputComponentProps
  clearBtn?: ButtonProps
}

type InputTextOwnProps<
  InputComponent extends ElementType,
  InputComponentProps extends
    ComponentPropsWithRef<InputComponent> = ComponentPropsWithRef<InputComponent>,
> = {
  defaultValue?: string
  prefix?: ReactNode
  suffix?: ReactNode
  value?: string
  clearable?: boolean
  onClear?: () => void
  classes?: ComponentUtilityClasses<'root' | 'input' | 'clearBtn'>
  slotProps?: InputTextSlotProps<InputComponentProps>
  className?: string
  name?: string
  as?: InputComponent
  sx?: SxProps<InputTextOwnerState<InputComponent>>
  ref?: InputComponentProps['ref']
  type?: InputComponentProps['type']
  onBlur?: InputComponentProps['onBlur']
  onFocus?: InputComponentProps['onFocus']
  onKeyUp?: InputComponentProps['onKeyUp']
  onChange?: InputComponentProps['onChange']
  onKeyDown?: InputComponentProps['onKeyDown']
  placeholder?: InputComponentProps['placeholder']
} & InputTextVariants

export type InputTextProps<InputComponent extends ElementType = 'input'> =
  Overwrite<InputTextOwnProps<InputComponent>, InputTextPropsOverrides>

export type InputTextOwnerState<InputComponent extends ElementType = 'input'> =
  InputTextProps<InputComponent>
