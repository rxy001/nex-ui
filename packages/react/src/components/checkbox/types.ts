import type { ReactNode, ElementType, ComponentPropsWithRef } from 'react'
import type { CheckboxVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'
import type { InnerIconProps } from '../icon/types'

export interface CheckboxPropsOverrides {}

type CheckboxSlotProps<CheckboxComponentProps> = {
  root?: ComponentPropsWithRef<'label'>
  input?: CheckboxComponentProps
  label?: ComponentPropsWithRef<'span'>
  icon?: InnerIconProps
  iconContainer?: ComponentPropsWithRef<'span'>
}

type CheckboxOwnProps<
  CheckboxComponent extends ElementType,
  CheckboxComponentProps extends
    ComponentPropsWithRef<CheckboxComponent> = ComponentPropsWithRef<CheckboxComponent>,
> = {
  sx?: SxProps<CheckboxOwnerState<CheckboxComponent>>
  as?: CheckboxComponent
  children?: ReactNode
  className?: string
  icon?:
    | ReactNode
    | ((ownerState: CheckboxOwnerState<CheckboxComponent>) => ReactNode)
  slotProps?: CheckboxSlotProps<CheckboxComponentProps>
  classes?: ComponentUtilityClasses<
    'root' | 'input' | 'icon' | 'label' | 'iconContainer'
  >
  defaultChecked?: boolean
  name?: string
  ref?: CheckboxComponentProps['ref']
  type?: CheckboxComponentProps['type']
  onBlur?: CheckboxComponentProps['onBlur']
  onFocus?: CheckboxComponentProps['onFocus']
  onChange?: CheckboxComponentProps['onChange']
  value?: string | number
} & CheckboxVariants

export type CheckboxProps<CheckboxComponent extends ElementType = 'input'> =
  Overwrite<CheckboxOwnProps<CheckboxComponent>, CheckboxPropsOverrides>

export type CheckboxOwnerState<
  CheckboxComponent extends ElementType = 'input',
> = CheckboxProps<CheckboxComponent>

type CheckboxGroupVariants = Pick<
  CheckboxVariants,
  'size' | 'color' | 'disabled' | 'radius'
>

export type CheckboxGroupValueType = number | string

export type CheckboxGroupProps<T> = {
  value?: T[]
  name?: string
  children?: ReactNode
  defaultValue?: T[]
  onChange?: (value: T[]) => void
} & CheckboxGroupVariants

export type CheckboxGroupContext<
  T extends CheckboxGroupValueType = CheckboxGroupValueType,
> = {
  toggleValue: (value: T) => void
  isChecked: (value?: T) => boolean
  name?: string
} & CheckboxGroupVariants
