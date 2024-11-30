import type { SVGAttributes, ComponentType } from 'react'
import type { NexCSSProperties } from '../../theme/types/generated/cssProperties'
import type { IconVariants } from '../../theme/styles'
import type { ComponentUtilityClasses, StyledComponentProps } from '../types'

export interface InnerIconProps
  extends StyledComponentProps<
    Omit<
      SVGAttributes<SVGElement> & IconVariants,
      'color' | 'width' | 'height' | 'fontSize'
    >
  > {
  width?: NexCSSProperties['width']
  height?: NexCSSProperties['height']
  color?: NexCSSProperties['color']
  fontSize?: IconVariants['fontSize'] | number | (string & NonNullable<unknown>)
  // eslint-disable-next-line no-use-before-define
  classes?: ComponentUtilityClasses<IconOwnerState, 'root'>
}

export interface IconProps extends InnerIconProps {
  component: ComponentType<any>
}

export interface IconOwnerState extends IconProps {}
