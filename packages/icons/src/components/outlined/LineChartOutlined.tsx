import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import LineChart from '../../svg/outlined/line-chart.svg'
import type { IconProps } from '../../types'

export const LineChartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(LineChart, { className: 'line-chart-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
