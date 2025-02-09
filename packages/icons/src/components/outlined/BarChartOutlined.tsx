'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BarChart from '../../svg/outlined/bar-chart.svg'
import type { IconProps } from '../../types'

export const BarChartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BarChart, { className: 'bar-chart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BarChartOutlined.displayName = 'BarChartOutlined'
