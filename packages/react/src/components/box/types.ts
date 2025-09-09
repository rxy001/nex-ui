import type { ElementType } from 'react'
import type { OverrideProps } from '../../types/utils'
import type { Interpolation } from '@nex-ui/system'

export interface BoxPropsOverrides {}

type BoxOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation
}

export type BoxProps<RootComponent extends ElementType = 'div'> = OverrideProps<
  RootComponent,
  BoxOwnProps<RootComponent>,
  BoxPropsOverrides
>
