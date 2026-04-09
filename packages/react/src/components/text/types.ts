import type { Overwrite } from '../../types/utils'
import type { BoxProps } from '../box'
import type { ElementType } from 'react'

export interface TextPropsOverrides {}

interface TextOwnProps {
  /**
   * If true, truncates the text with an ellipsis if it overflows its container.
   *
   * @default false
   */
  truncate?: boolean
}

export type TextProps<RootComponent extends ElementType = 'p'> =
  BoxProps<RootComponent> & Overwrite<TextOwnProps, TextPropsOverrides>
