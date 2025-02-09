'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PieChart from '../../svg/outlined/pie-chart.svg'
import type { IconProps } from '../../types'

export const PieChartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PieChart, { className: 'pie-chart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PieChartOutlined.displayName = 'PieChartOutlined'
