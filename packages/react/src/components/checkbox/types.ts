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
  slotProps?: CheckboxSlotProps<CheckboxComponentProps>
  classes?: ComponentUtilityClasses<
    CheckboxOwnerState<CheckboxComponent>,
    'root' | 'input' | 'icon' | 'label' | 'iconContainer'
  >
  defaultChecked?: boolean
  ref?: CheckboxComponentProps['ref']
  id?: CheckboxComponentProps['id']
  type?: CheckboxComponentProps['type']
  onBlur?: CheckboxComponentProps['onBlur']
  onFocus?: CheckboxComponentProps['onFocus']
  onChange?: CheckboxComponentProps['onChange']
} & CheckboxVariants

export type CheckboxProps<CheckboxComponent extends ElementType = 'input'> =
  Overwrite<CheckboxOwnProps<CheckboxComponent>, CheckboxPropsOverrides>

export type CheckboxOwnerState<
  CheckboxComponent extends ElementType = 'input',
> = CheckboxProps<CheckboxComponent>
