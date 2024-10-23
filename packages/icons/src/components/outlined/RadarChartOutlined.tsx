import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadarChart from '../../svg/outlined/radar-chart.svg'
import type { IconProps } from '../../types'

export const RadarChartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RadarChart, { className: 'radar-chart-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
