import type { ElementType } from 'react'
import type { BoxProps } from '../box'
import type { Overwrite } from '../../types/utils'
import type { HeadingVariants } from '../../themes/recipes'

export interface HeadingPropsOverrides {}

export interface HeadingOwnProps {
  /**
   * If true, truncates the text with an ellipsis if it overflows its container.
   *
   * @default false
   */
  truncate?: boolean

  /**
   * The size of the Heading. This will determine the font size and line height of the heading.
   *
   * @default 'md'
   */
  size?: HeadingVariants['size']
}

export type HeadingProps<RootComponent extends ElementType = 'h2'> =
  BoxProps<RootComponent> & Overwrite<HeadingOwnProps, HeadingPropsOverrides>
