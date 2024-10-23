import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PieChart from '../../svg/filled/pie-chart.svg'
import type { IconProps } from '../../types'

export const PieChartFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PieChart, { className: 'pie-chart-filled' })
    return <Icon {...props} ref={ref} />
  },
)
