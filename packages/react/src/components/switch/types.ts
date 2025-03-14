import type { ElementType, ComponentPropsWithRef, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type {
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'
import type { SwitchVariants } from '../../theme/slotRecipes'

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
  name?: string
  defaultChecked?: boolean
  className?: ClassValue
  startIcon?: ReactNode
  endIcon?: ReactNode
  slotProps?: SwitchSlotProps<SwitchComponentProps>
  classes?: ComponentUtilityClasses<
    'root' | 'input' | 'track' | 'startIcon' | 'endIcon' | 'thumb'
  >
  thumbIcon?:
    | ReactNode
    | ((ownerState: SwitchOwnerState<SwitchComponent>) => ReactNode)
  ref?: SwitchComponentProps['ref']
  onChange?: SwitchComponentProps['onChange']
} & SwitchVariants

export type SwitchProps<SwitchComponent extends ElementType = 'input'> =
  Overwrite<SwitchOwnProps<SwitchComponent>, SwitchPropsOverrides>

export type SwitchOwnerState<SwitchComponent extends ElementType = 'input'> =
  SwitchProps<SwitchComponent>
