import type { ElementType, ReactNode } from 'react'
import type { FlexVariants } from '../../theme/recipes'
import type { NexCSSProperties } from '../../types/generated/cssProperties'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface FlexPropsOverrides {}

type FlexOwnProps<RootComponent extends ElementType> = {
  children?: ReactNode
  className?: string
  justify?: NexCSSProperties['justifyContent']
  align?: NexCSSProperties['alignItems']
  direction?: NexCSSProperties['flexDirection']
  wrap?: NexCSSProperties['flexWrap']
  gap?: NexCSSProperties['gap']
  as?: RootComponent
  sx?: SxProps<FlexOwnerState<RootComponent>>
} & FlexVariants

export type FlexProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, FlexOwnProps<RootComponent>, FlexPropsOverrides>

export type FlexOwnerState<RootComponent extends ElementType = 'div'> =
  FlexProps<RootComponent>
