import type { SVGAttributes, ComponentType } from 'react'
import type {
  IconVariants,
  NexStyledComponentProps,
  NexCSSProperties,
} from '../../theme'
import type { ComponentUtilityClasses } from '../type'

export interface IconOwnerState
  extends Omit<
    SVGAttributes<SVGElement> & IconVariants,
    'color' | 'width' | 'height' | 'fontSize'
  > {
  width?: NexCSSProperties['width']
  height?: NexCSSProperties['height']
  color?: NexCSSProperties['color']
  fontSize?: IconVariants['fontSize'] | number | (string & NonNullable<unknown>)
  classes?: ComponentUtilityClasses<IconOwnerState, 'root'>
}

export type InnerIconProps = NexStyledComponentProps<IconOwnerState>

export interface IconProps extends InnerIconProps {
  component: ComponentType<any>
}
