import type { ElementType } from 'react'
import type { OverrideProps } from '../types'

export interface BoxPropsOverrides {}

export type BoxProps<RootComponent extends ElementType = 'div'> = OverrideProps<
  RootComponent,
  BoxPropsOverrides
>
