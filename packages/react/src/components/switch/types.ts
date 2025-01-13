import type { ElementType, ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'
import type { SwitchVariants } from '../../theme/recipes'

export interface SwitchPropsOverrides {}

type SwitchSlotProps<SwitchComponentProps> = {
  root?: ComponentPropsWithRef<'label'>
  input?: SwitchComponentProps
  track?: ComponentPropsWithRef<'span'>
  startIcon?: ComponentPropsWithRef<'span'>
  endIcon?: ComponentPropsWithRef<'span'>
  thumb?: ComponentPropsWithRef<'span'>
}

export type SwitchOwnProps<
  SwitchComponent extends ElementType,
  SwitchComponentProps extends
    ComponentPropsWithRef<SwitchComponent> = ComponentPropsWithRef<SwitchComponent>,
> = {
  as?: SwitchComponent
  sx?: SxProps<SwitchOwnerState<SwitchComponent>>
  checked?: boolean
  defaultChecked?: boolean
  className?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  slotProps?: SwitchSlotProps<SwitchComponentProps>
  classes?: ComponentUtilityClasses<
    SwitchOwnerState<SwitchComponent>,
    'root' | 'input' | 'track' | 'startIcon' | 'endIcon' | 'thumb'
  >
  thumbIcon?:
    | ReactNode
    | ((ownerState: SwitchOwnerState<SwitchComponent>) => ReactNode)
  id?: SwitchComponentProps['id']
  ref?: SwitchComponentProps['ref']
  type?: SwitchComponentProps['type']
  onBlur?: SwitchComponentProps['onBlur']
  onFocus?: SwitchComponentProps['onFocus']
  onClick?: SwitchComponentProps['onClick']
  onChange?: SwitchComponentProps['onChange']
} & SwitchVariants

export type SwitchProps<SwitchComponent extends ElementType = 'input'> =
  Overwrite<SwitchOwnProps<SwitchComponent>, SwitchPropsOverrides>

export type SwitchOwnerState<SwitchComponent extends ElementType = 'input'> =
  SwitchProps<SwitchComponent>
