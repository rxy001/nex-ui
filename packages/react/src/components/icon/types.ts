import type { ComponentType, ElementType } from 'react'
import type { NexCSSProperties } from '../../types/generated/cssProperties'
import type { IconVariants } from '../../theme/recipes'
import type { ComponentUtilityClasses, OverrideProps } from '../../types/utils'

export interface IconPropsOverrides {}

export type IconOwnProsp<RootComponent extends ElementType> = IconVariants & {
  width?: NexCSSProperties['width']
  height?: NexCSSProperties['height']
  color?: NexCSSProperties['color']
  fontSize?: IconVariants['fontSize'] | number | (string & NonNullable<unknown>)
  classes?: ComponentUtilityClasses<IconOwnerState<RootComponent>, 'root'>
}

export type InnerIconProps<RootComponent extends ElementType = 'svg'> =
  OverrideProps<RootComponent, IconOwnProsp<RootComponent>, IconPropsOverrides>

export type IconProps<RootComponent extends ElementType = 'svg'> =
  InnerIconProps<RootComponent> & {
    component: ComponentType<any>
  }

export type IconOwnerState<RootComponent extends ElementType = 'svg'> =
  IconProps<RootComponent>
