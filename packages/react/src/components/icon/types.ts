import type { NexCSSProperties } from '@nex-ui/system'
import type { SVGAttributes, ComponentType } from 'react'
import type { IconVariants } from '../../theme'

export interface IconProps
  extends Omit<
      SVGAttributes<SVGElement>,
      'width' | 'height' | 'color' | 'fontSize'
    >,
    Omit<IconVariants, 'fontSize'> {
  width?: NexCSSProperties['width']
  height?: NexCSSProperties['height']
  color?: NexCSSProperties['color']
  fontSize?: IconVariants['fontSize'] | number | (string & { __type?: never })
  component: ComponentType<any>
}

export type InnerIconProps = Omit<IconProps, 'component'>
