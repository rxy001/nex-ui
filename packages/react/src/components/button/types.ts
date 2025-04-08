import type { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'
import type { ClassValue } from 'clsx'
import type { ButtonVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface ButtonPropsOverrides {}

type ButtonSlotProps<RootComponent extends ElementType> = {
  startIcon?: ComponentPropsWithCommonProps<
    'span',
    ButtonOwnerState<RootComponent>
  >
  endIcon?: ComponentPropsWithCommonProps<
    'span',
    ButtonOwnerState<RootComponent>
  >
}

type ButtonOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<ButtonOwnerState<RootComponent>>
  startIcon?: ReactNode
  endIcon?: ReactNode
  spinner?: ReactNode
  spinnerPlacement?: 'start' | 'end'
  href?: string
  loading?: boolean
  children?: ReactNode
  disableRipple?: boolean
  className?: ClassValue
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  slotProps?: ButtonSlotProps<RootComponent>
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
