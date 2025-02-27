import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { FlexVariants } from '../../theme/recipes'
import type { NexUICSSProperties } from '../../types/cssProperties'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface FlexPropsOverrides {}

type FlexOwnProps<RootComponent extends ElementType> = {
  children?: ReactNode
  className?: ClassValue
  justify?: NexUICSSProperties['justifyContent']
  align?: NexUICSSProperties['alignItems']
  direction?: NexUICSSProperties['flexDirection']
  wrap?: NexUICSSProperties['flexWrap']
  gap?: NexUICSSProperties['gap']
  as?: RootComponent
  sx?: SxProps<FlexOwnerState<RootComponent>>
} & FlexVariants

export type FlexProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, FlexOwnProps<RootComponent>, FlexPropsOverrides>

export type FlexOwnerState<RootComponent extends ElementType = 'div'> =
  FlexProps<RootComponent>
