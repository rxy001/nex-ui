'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import HeatMap from '../../svg/outlined/heat-map.svg'
import type { IconProps } from '../../types'

export const HeatMapOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(HeatMap, { className: 'heat-map-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HeatMapOutlined.displayName = 'HeatMapOutlined'
