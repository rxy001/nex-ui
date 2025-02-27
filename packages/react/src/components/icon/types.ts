import type { ComponentType, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { NexUICSSProperties } from '../../types/cssProperties'
import type { IconVariants } from '../../theme/recipes'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface IconPropsOverrides {}

export type IconOwnProsp<RootComponent extends ElementType> = Omit<
  IconVariants,
  'fontSize'
> & {
  className?: ClassValue
  width?: NexUICSSProperties['width']
  height?: NexUICSSProperties['height']
  color?: NexUICSSProperties['color']
  fontSize?: IconVariants['fontSize'] | number | (string & {})
  as?: RootComponent
  sx?: SxProps<IconOwnerState<RootComponent>>
}

export type InnerIconProps<RootComponent extends ElementType = 'svg'> =
  OverrideProps<RootComponent, IconOwnProsp<RootComponent>, IconPropsOverrides>

export type IconProps<RootComponent extends ElementType = 'svg'> =
  InnerIconProps<RootComponent> & {
    component: ComponentType<any>
  }

export type IconOwnerState<RootComponent extends ElementType = 'svg'> =
  IconProps<RootComponent>
