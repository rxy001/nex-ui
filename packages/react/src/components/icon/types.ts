import type { ComponentType, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject } from '@nex-ui/system'
import type { IconVariants } from '../../theme/recipes'
import type { OverrideProps, SxProp } from '../../types/utils'

export interface IconPropsOverrides {}

export type IconOwnProsp<RootComponent extends ElementType> = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<IconOwnerState<RootComponent>>

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The width of the icon.
   * @default '1em'
   */
  width?: CSSObject['width']

  /**
   * The height of the icon.
   * @default '1em'
   */
  height?: CSSObject['height']

  /**
   * The color of the icon.
   */
  color?: CSSObject['color']

  /**
   * The component used for the root node.
   */
  as?: ComponentType<any>

  /**
   * Rotate icon with animation.
   * @default false
   */
  spin?: boolean

  /**
   * The size of the icon.
   * @default 'md'
   */
  size?: IconVariants['size']
}

export type IconProps<RootComponent extends ElementType = 'svg'> =
  OverrideProps<RootComponent, IconOwnProsp<RootComponent>, IconPropsOverrides>

export type IconOwnerState<RootComponent extends ElementType = 'svg'> =
  IconProps<RootComponent> & {
    spin: boolean
    size: IconVariants['size']
    width: CSSObject['width']
    height: CSSObject['height']
  }
