import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BarChart from '../../svg/outlined/bar-chart.svg'
import type { IconProps } from '../../types'

export const BarChartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BarChart)
    return <Icon {...props} ref={ref} />
  },
)
