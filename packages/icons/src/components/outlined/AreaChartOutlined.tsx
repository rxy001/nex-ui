import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AreaChart from '../../svg/outlined/area-chart.svg'
import type { IconProps } from '../../types'

export const AreaChartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AreaChart, { className: 'area-chart-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
