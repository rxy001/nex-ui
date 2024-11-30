import type { SVGAttributes } from 'react'

export interface IconPropsOverrides {}

export interface IconProps
  extends Omit<SVGAttributes<SVGElement>, keyof IconPropsOverrides>,
    IconPropsOverrides {}
