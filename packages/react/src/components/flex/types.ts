import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject } from '@nex-ui/system'
import type { FlexVariants } from '../../theme/recipes'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface FlexPropsOverrides {}

type FlexOwnProps<RootComponent extends ElementType> = {
  children?: ReactNode
  className?: ClassValue
  justify?: CSSObject['justifyContent']
  align?: CSSObject['alignItems']
  direction?: CSSObject['flexDirection']
  wrap?: CSSObject['flexWrap']
  gap?: CSSObject['gap']
  as?: RootComponent
  sx?: SxProps<FlexOwnerState<RootComponent>>
} & FlexVariants

export type FlexProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, FlexOwnProps<RootComponent>, FlexPropsOverrides>

export type FlexOwnerState<RootComponent extends ElementType = 'div'> =
  FlexProps<RootComponent>
