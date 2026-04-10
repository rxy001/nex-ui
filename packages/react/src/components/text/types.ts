import type { TextVariants } from '../../themes/recipes'
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

  /**
   * If true, applies the underline text decoration to the content.
   */
  underline?: boolean

  /**
   * If true, applies the line-through text decoration to the content.
   */
  strikethrough?: boolean

  /**
   * The size of the Text, which determines the font size and line height.
   */
  size?: TextVariants['size']
}

export type TextProps<RootComponent extends ElementType = 'span'> =
  BoxProps<RootComponent> & Overwrite<TextOwnProps, TextPropsOverrides>
