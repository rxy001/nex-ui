import type { ElementType, ReactNode } from 'react'
import type { FlexVariants } from '../../theme/recipes'
import type { NexCSSProperties } from '../../types/generated/cssProperties'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
} from '../../types/utils'

export interface FlexPropsOverrides {}

type FlexOwnProps<RootComponent extends ElementType> = {
  children?: ReactNode
  justify?: NexCSSProperties['justifyContent']
  align?: NexCSSProperties['alignItems']
  direction?: NexCSSProperties['flexDirection']
  wrap?: NexCSSProperties['flexWrap']
  gap?: NexCSSProperties['gap']
  classes?: ComponentUtilityClasses<FlexOwnerState<RootComponent>, 'root'>
  as?: RootComponent
  sx?: SxProps<FlexOwnerState<RootComponent>>
} & FlexVariants

export type FlexProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, FlexOwnProps<RootComponent>, FlexPropsOverrides>

export type FlexOwnerState<RootComponent extends ElementType = 'div'> =
  FlexProps<RootComponent>
