import type { ReactNode, ElementType, ComponentPropsWithRef } from 'react'
import type { CheckboxVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  CreateSlotProps,
  Overwrite,
  SxProp,
} from '../../types/utils'
import type { InnerIconProps } from '../icon/types'

export interface CheckboxPropsOverrides {}

type CheckboxSlotProps<CheckboxComponentProps> = CreateSlotProps<{
  root?: ComponentPropsWithRef<'label'>
  input?: CheckboxComponentProps
  label?: ComponentPropsWithRef<'span'>
  icon?: InnerIconProps
  iconContainer?: ComponentPropsWithRef<'span'>
}>

type CheckboxOwnProps<
  CheckboxComponent extends ElementType,
  CheckboxComponentProps extends ComponentPropsWithRef<CheckboxComponent>,
> = Overwrite<
  {
    sx?: SxProp
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
    onClick?: CheckboxComponentProps['onClick']
  } & CheckboxVariants,
  CheckboxPropsOverrides
>

export type CheckboxProps<CheckboxComponent extends ElementType = 'input'> =
  CheckboxOwnProps<CheckboxComponent, ComponentPropsWithRef<CheckboxComponent>>

export type CheckboxOwnerState<
  CheckboxComponent extends ElementType = 'input',
> = CheckboxProps<CheckboxComponent>
