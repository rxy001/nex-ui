import type { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'
import type { ButtonVariants, ButtonSlots } from '../../theme/recipes'
import type { ComponentUtilityClasses, OverrideProps } from '../types'

export interface ButtonPropsOverrides {}

type ButtonOwnProps<RootComponent extends ElementType> = {
  startIcon?: ReactNode
  endIcon?: ReactNode
  classes?: ComponentUtilityClasses<
    ButtonOwnerState<RootComponent>,
    ButtonSlots
  >
  href?: string
  children?: ReactNode
  className?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
} & ButtonVariants

export type ButtonProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    ButtonOwnProps<RootComponent>,
    ButtonPropsOverrides
  >

export type ButtonOwnerState<RootComponent extends ElementType = 'button'> =
  ButtonProps<RootComponent>
