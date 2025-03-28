import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { CheckboxVariants } from '../../theme/slotRecipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface CheckboxPropsOverrides {}

type CheckboxSlotProps<CheckboxComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<
    'label',
    CheckboxOwnerState<CheckboxComponent>
  >
  input?: ComponentPropsWithCommonProps<
    'input',
    CheckboxOwnerState<CheckboxComponent>
  >
  label?: ComponentPropsWithCommonProps<
    'span',
    CheckboxOwnerState<CheckboxComponent>
  >
  icon?: ComponentPropsWithCommonProps<
    'span',
    CheckboxOwnerState<CheckboxComponent>
  >
}

type CheckboxOwnProps<CheckboxComponent extends ElementType> = {
  sx?: SxProps<CheckboxOwnerState<CheckboxComponent>>
  as?: CheckboxComponent
  children?: ReactNode
  className?: ClassValue
  icon?:
    | ReactNode
    | ((ownerState: CheckboxOwnerState<CheckboxComponent>) => ReactNode)
  slotProps?: CheckboxSlotProps<CheckboxComponent>
  classes?: ComponentUtilityClasses<'root' | 'input' | 'label' | 'icon'>
  defaultChecked?: boolean
  value?: string | number
  onValueChange?: (checked: boolean) => void
} & CheckboxVariants

export type CheckboxProps<CheckboxComponent extends ElementType = 'input'> =
  OverrideProps<
    CheckboxComponent,
    CheckboxOwnProps<CheckboxComponent>,
    CheckboxPropsOverrides
  >
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
  onValueChange?: (value: T[]) => void
} & CheckboxGroupVariants

export type CheckboxGroupContext<
  T extends CheckboxGroupValueType = CheckboxGroupValueType,
> = {
  toggleValue: (value: T) => void
  isChecked: (value?: T) => boolean
  name?: string
} & CheckboxGroupVariants
