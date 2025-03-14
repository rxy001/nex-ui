import type { ReactNode, ElementType, ComponentPropsWithRef } from 'react'
import type { ClassValue } from 'clsx'
import type { CheckboxVariants } from '../../theme/slotRecipes'
import type {
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'

export interface CheckboxPropsOverrides {}

type CheckboxSlotProps<CheckboxComponentProps> = {
  root?: ComponentPropsWithRef<'label'>
  input?: CheckboxComponentProps
  label?: ComponentPropsWithRef<'span'>
  icon?: ComponentPropsWithRef<'span'>
}

type CheckboxOwnProps<
  CheckboxComponent extends ElementType,
  CheckboxComponentProps extends
    ComponentPropsWithRef<CheckboxComponent> = ComponentPropsWithRef<CheckboxComponent>,
> = {
  sx?: SxProps<CheckboxOwnerState<CheckboxComponent>>
  as?: CheckboxComponent
  children?: ReactNode
  className?: ClassValue
  icon?:
    | ReactNode
    | ((ownerState: CheckboxOwnerState<CheckboxComponent>) => ReactNode)
  slotProps?: CheckboxSlotProps<CheckboxComponentProps>
  classes?: ComponentUtilityClasses<'root' | 'input' | 'label' | 'icon'>
  defaultChecked?: boolean
  name?: string
  ref?: CheckboxComponentProps['ref']
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

export type CheckboxGroupProps<
  T extends CheckboxGroupValueType = CheckboxGroupValueType,
> = {
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
