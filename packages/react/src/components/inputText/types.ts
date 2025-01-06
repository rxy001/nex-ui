import type { ReactNode, ElementType, ComponentPropsWithRef } from 'react'
import type { StyledComponentProps } from '@nex-ui/styled'
import type { InputTextVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  Overwrite,
  CreateSlotProps,
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
  } & Pick<
    InputComponentProps,
    | 'ref'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'onKeyUp'
    | 'onKeyDown'
    | 'placeholder'
    | 'type'
    | 'id'
    | 'className'
  > &
    InputTextVariants &
    Pick<StyledComponentProps<InputComponent>, 'sx' | 'as'>,
  InputTextPropsOverrides
>

export type InputTextProps<InputComponent extends ElementType = 'input'> =
  InputTextOwnProps<InputComponent, ComponentPropsWithRef<InputComponent>>

export type InputTextOwnerState<InputComponent extends ElementType = 'input'> =
  InputTextProps<InputComponent>
