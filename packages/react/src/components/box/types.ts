import type { ElementType } from 'react'
import type { StyleObject } from '@nex-ui/system'
import type { OverrideProps } from '../../types/utils'

export interface BoxPropsOverrides {}

type BoxOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: StyleObject | StyleObject[]
}

export type BoxProps<RootComponent extends ElementType = 'div'> = OverrideProps<
  RootComponent,
  BoxOwnProps<RootComponent>,
  BoxPropsOverrides
>
