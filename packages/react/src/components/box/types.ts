import type { ElementType } from 'react'
import type { OverrideProps, SxProp } from '../../types/utils'

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
  sx?: SxProp<{}>
}

export type BoxProps<RootComponent extends ElementType = 'div'> = OverrideProps<
  RootComponent,
  BoxOwnProps<RootComponent>,
  BoxPropsOverrides
>
