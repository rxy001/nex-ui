import type { StyleObject } from '@nex-ui/system'
import type { SVGAttributes, ComponentType } from 'react'
import type { IconVariants } from '../../theme'

export interface IconProps
  extends Omit<
      SVGAttributes<SVGElement>,
      'width' | 'height' | 'color' | 'fontSize'
    >,
    Omit<IconVariants, 'fontSize'> {
  width?: StyleObject['width']
  height?: StyleObject['height']
  color?: StyleObject['color']
  fontSize?: IconVariants['fontSize'] | number | (string & NonNullable<unknown>)
  sx?: StyleObject
  component: ComponentType<any>
}

export type InnerIconProps = Omit<IconProps, 'component'>
export interface IconOwnerState extends InnerIconProps {}
