import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PieChart from '../../svg/outlined/pie-chart.svg'
import type { IconProps } from '../../types'

export const PieChartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PieChart, { className: 'pie-chart-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
