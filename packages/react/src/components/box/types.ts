import type { ElementType } from 'react'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface BoxPropsOverrides {}

type BoxOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps
}

export type BoxProps<RootComponent extends ElementType = 'div'> = OverrideProps<
  RootComponent,
  BoxOwnProps<RootComponent>,
  BoxPropsOverrides
>
