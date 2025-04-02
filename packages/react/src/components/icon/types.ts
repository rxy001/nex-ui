import type { ComponentType, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject } from '@nex-ui/system'
import type { IconVariants } from '../../theme/recipes'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface IconPropsOverrides {}

export type IconOwnProsp<RootComponent extends ElementType> = {
  className?: ClassValue
  width?: CSSObject['width']
  height?: CSSObject['height']
  color?: CSSObject['color']
  as?: RootComponent
  sx?: SxProps<IconOwnerState<RootComponent>>
  component?: ComponentType<any>
} & IconVariants

export type IconProps<RootComponent extends ElementType = 'svg'> =
  OverrideProps<RootComponent, IconOwnProsp<RootComponent>, IconPropsOverrides>

export type IconOwnerState<RootComponent extends ElementType = 'svg'> =
  IconProps<RootComponent>
