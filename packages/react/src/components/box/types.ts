import type { ElementType } from 'react'
import type { OverrideProps } from '../../types/utils'
import type { Interpolation, SystemCSSProps } from '@nex-ui/system'

export interface BoxPropsOverrides {}

interface BoxOwnProps<RootComponent extends ElementType>
  extends SystemCSSProps {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The size attribute for the HTMLElement.
   */
  htmlSize?: number | string

  /**
   * The width attribute for the HTMLElement.
   */
  htmlWidth?: number | string

  /**
   * The height attribute for the HTMLElement.
   */
  htmlHeight?: number | string

  /**
   * The translate attribute for the HTMLElement.
   */
  htmlTranslate?: 'yes' | 'no'
}

export type BoxProps<RootComponent extends ElementType = 'div'> = OverrideProps<
  RootComponent,
  BoxOwnProps<RootComponent>,
  BoxPropsOverrides
>
