'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DotChart from '../../svg/outlined/dot-chart.svg'
import type { IconProps } from '../../types'

export const DotChartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DotChart, { className: 'dot-chart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DotChartOutlined.displayName = 'DotChartOutlined'
