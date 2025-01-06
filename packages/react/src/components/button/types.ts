import type {
  ReactNode,
  ElementType,
  AnchorHTMLAttributes,
  ComponentPropsWithRef,
} from 'react'
import type { ButtonVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  CreateSlotProps,
  OverrideProps,
} from '../../types/utils'

export interface ButtonPropsOverrides {}

type ButtonSlotProps = CreateSlotProps<{
  startIcon?: ComponentPropsWithRef<'span'>
  endIcon?: ComponentPropsWithRef<'span'>
}>

type ButtonOwnProps<RootComponent extends ElementType> = {
  startIcon?: ReactNode
  endIcon?: ReactNode
  href?: string
  children?: ReactNode
  className?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  slotProps?: ButtonSlotProps
  classes?: ComponentUtilityClasses<
    ButtonOwnerState<RootComponent>,
    'root' | 'startIcon' | 'endIcon'
  >
} & ButtonVariants

export type ButtonProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    ButtonOwnProps<RootComponent>,
    ButtonPropsOverrides
  >

export type ButtonOwnerState<RootComponent extends ElementType = 'button'> =
  ButtonProps<RootComponent>
