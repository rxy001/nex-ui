import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { OverrideProps } from '../../types/utils'

export interface FlexPropsOverrides {}

interface FlexOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   *
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content of the Flex.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

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
   * Sets the gap between flex items.
   */
  gap?: CSSObject['gap']

  /**
   * If true, displays the flex container as an inline-flex container.
   * @default false
   */
  inline?: boolean
}

export type FlexProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, FlexOwnProps<RootComponent>, FlexPropsOverrides>
