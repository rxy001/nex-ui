import type { ElementType } from 'react'
import type { CSSObject } from '@nex-ui/system'
import type { Overwrite } from '../../types/utils'
import type { BoxProps } from '../box'

export interface FlexPropsOverrides {}

interface FlexOwnProps {
  /**
   * Sets alignment along the main axis.
   */
  justify?: CSSObject['justifyContent']

  /**
   * Sets alignment along the cross axis.
   */
  align?: CSSObject['alignItems']

  /**
   * Controls item direction and defines the main axis in the flex container.
   * @default 'row'
   */
  direction?: CSSObject['flexDirection']

  /**
   * Controls whether items wrap to multiple lines.
   */
  wrap?: CSSObject['flexWrap']

  /**
   * Sets the size of the gap between flex items.
   */
  gap?: CSSObject['gap']

  /**
   * Sets the size of the gap between an element's columns. This is a shorthand for `column-gap`.
   */
  gapX?: CSSObject['columnGap']

  /**
   * Sets the size of the gap between an element's rows. This is a shorthand for `row-gap`.
   */
  gapY?: CSSObject['rowGap']

  /**
   * If true, displays the flex container as an inline-flex container.
   * @default false
   */
  inline?: boolean
}

export type FlexProps<RootComponent extends ElementType = 'div'> =
  BoxProps<RootComponent> & Overwrite<FlexOwnProps, FlexPropsOverrides>
