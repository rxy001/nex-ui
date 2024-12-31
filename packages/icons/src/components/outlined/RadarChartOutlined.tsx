import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadarChart from '../../svg/outlined/radar-chart.svg'
import type { IconProps } from '../../types'

export const RadarChartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RadarChart, { className: 'radar-chart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RadarChartOutlined.displayName = 'RadarChartOutlined'
