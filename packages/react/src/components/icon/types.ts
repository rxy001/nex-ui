import type { ComponentType, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { IconVariants } from '../../theme/recipes'
import type { OverrideProps } from '../../types/utils'

export interface IconPropsOverrides {}

export type IconOwnProps = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

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
  OverrideProps<RootComponent, IconOwnProps, IconPropsOverrides>
