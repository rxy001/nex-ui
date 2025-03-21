import type { ElementType, ComponentProps, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type {
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  Overwrite,
  SxProps,
} from '../../types/utils'
import type { SwitchVariants } from '../../theme/slotRecipes'

export interface SwitchPropsOverrides {}

type SwitchSlotProps<SwitchComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<
    'label',
    SwitchOwnerState<SwitchComponent>
  >
  input?: ComponentPropsWithCommonProps<
    SwitchComponent,
    SwitchOwnerState<SwitchComponent>
  >
  track?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  startIcon?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  endIcon?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  thumb?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
}

export type SwitchOwnProps<
  SwitchComponent extends ElementType,
  SwitchComponentProps extends
    ComponentProps<SwitchComponent> = ComponentProps<SwitchComponent>,
> = {
  as?: SwitchComponent
  sx?: SxProps<SwitchOwnerState<SwitchComponent>>
  name?: string
  defaultChecked?: boolean
  className?: ClassValue
  startIcon?: ReactNode
  endIcon?: ReactNode
  slotProps?: SwitchSlotProps<SwitchComponent>
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
