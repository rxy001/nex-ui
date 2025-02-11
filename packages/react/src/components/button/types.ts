import type {
  ReactNode,
  ElementType,
  AnchorHTMLAttributes,
  ComponentPropsWithRef,
} from 'react'
import type { ButtonVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
} from '../../types/utils'

export interface ButtonPropsOverrides {}

type ButtonSlotProps = {
  startIcon?: ComponentPropsWithRef<'span'>
  endIcon?: ComponentPropsWithRef<'span'>
}

type ButtonOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<ButtonOwnerState<RootComponent>>
  startIcon?: ReactNode
  endIcon?: ReactNode
  spinner?: ReactNode
  spinnerPlacement?: 'start' | 'end'
  href?: string
  children?: ReactNode
  className?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  slotProps?: ButtonSlotProps
  classes?: ComponentUtilityClasses<'startIcon' | 'endIcon'>
} & ButtonVariants

export type ButtonProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    ButtonOwnProps<RootComponent>,
    ButtonPropsOverrides
  >

export type ButtonOwnerState<RootComponent extends ElementType = 'button'> =
  ButtonProps<RootComponent>
