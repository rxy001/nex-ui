import type { ReactNode, ElementType, ComponentPropsWithRef } from 'react'
import type { InputTextVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  Overwrite,
  CreateSlotProps,
  SxProp,
} from '../../types/utils'
import type { ButtonProps } from '../button'

export interface InputTextPropsOverrides {}

type InputTextSlotProps<InputComponentProps> = CreateSlotProps<{
  root?: ComponentPropsWithRef<'span'>
  input?: InputComponentProps
  clearBtn?: ButtonProps
}>

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
    classes?: ComponentUtilityClasses<
      InputTextOwnerState<InputComponent>,
      'root' | 'input' | 'clearBtn'
    >
    slotProps?: InputTextSlotProps<InputComponentProps>
    className?: string
    as?: InputComponent
    sx?: SxProp
    id?: string
    ref?: InputComponentProps['ref']
    type?: InputComponentProps['type']
    onBlur?: InputComponentProps['onBlur']
    onFocus?: InputComponentProps['onFocus']
    onKeyUp?: InputComponentProps['onKeyUp']
    onChange?: InputComponentProps['onChange']
    onKeyDown?: InputComponentProps['onKeyDown']
    placeholder?: InputComponentProps['placeholder']
  } & InputTextVariants,
  InputTextPropsOverrides
>

export type InputTextProps<InputComponent extends ElementType = 'input'> =
  InputTextOwnProps<InputComponent, ComponentPropsWithRef<InputComponent>>

export type InputTextOwnerState<InputComponent extends ElementType = 'input'> =
  InputTextProps<InputComponent>
