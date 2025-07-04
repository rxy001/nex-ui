import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject } from '@nex-ui/system'
import type { OverrideProps, SxProp } from '../../types/utils'

export interface FlexPropsOverrides {}

type FlexOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root node.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<FlexOwnerState<RootComponent>>

  /**
   * The content of the flex.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * Set the alignment of elements in the direction of the main axis.
   */
  justify?: CSSObject['justifyContent']

  /**
   * Set the alignment of elements in the direction of the cross axis.
   */
  align?: CSSObject['alignItems']

  /**
   * Set how flex items are placed in the flex container that defines the main axis and the direction.
   * @default 'row'
   */
  direction?: CSSObject['flexDirection']

  /**
   * Set whether the element is displayed in a single line or in multiple lines.
   */
  wrap?: CSSObject['flexWrap']

  /**
   * Set the gap between flex items.
   */
  gap?: CSSObject['gap']

  /**
   * If true, the flex container is displayed as an inline flex container.
   * @default false
   */
  inline?: boolean
}

export type FlexProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, FlexOwnProps<RootComponent>, FlexPropsOverrides>

export type FlexOwnerState<RootComponent extends ElementType = 'div'> =
  FlexProps<RootComponent> & {
    inline: boolean
    direction: CSSObject['flexDirection']
  }
