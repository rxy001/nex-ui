import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type {
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  OverrideProps,
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
    'input',
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
  label?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
}

export type SwitchOwnProps<SwitchComponent extends ElementType> = {
  as?: SwitchComponent
  sx?: SxProps<SwitchOwnerState<SwitchComponent>>
  children?: ReactNode
  className?: ClassValue
  startIcon?: ReactNode
  endIcon?: ReactNode
  slotProps?: SwitchSlotProps<SwitchComponent>
  classes?: ComponentUtilityClasses<
    'root' | 'input' | 'track' | 'startIcon' | 'endIcon' | 'thumb' | 'label'
  >
  thumbIcon?:
    | ReactNode
    | ((ownerState: SwitchOwnerState<SwitchComponent>) => ReactNode)
  onCheckedChange?: (checked: boolean) => void
} & SwitchVariants

export type SwitchProps<SwitchComponent extends ElementType = 'input'> =
  OverrideProps<
    SwitchComponent,
    SwitchOwnProps<SwitchComponent>,
    SwitchPropsOverrides
  >

export type SwitchOwnerState<SwitchComponent extends ElementType = 'input'> =
  SwitchProps<SwitchComponent>
