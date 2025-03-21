import type { ReactNode, ElementType, ComponentProps } from 'react'
import type { ClassValue } from 'clsx'
import type { InputTextVariants } from '../../theme/slotRecipes'
import type {
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'
import type { ButtonProps } from '../button'

export interface InputTextPropsOverrides {}

type InputTextSlotProps<InputComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<
    'label',
    InputTextOwnerState<InputComponent>
  >
  input?: ComponentPropsWithCommonProps<
    InputComponent,
    InputTextOwnerState<InputComponent>
  >
  clearBtn?: ButtonProps
}

type InputTextOwnProps<
  InputComponent extends ElementType,
  InputComponentProps extends
    ComponentProps<InputComponent> = ComponentProps<InputComponent>,
> = {
  defaultValue?: string
  prefix?: ReactNode
  suffix?: ReactNode
  value?: string
  clearable?: boolean
  onClear?: () => void
  classes?: ComponentUtilityClasses<'root' | 'input' | 'clearBtn'>
  slotProps?: InputTextSlotProps<InputComponent>
  className?: ClassValue
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
