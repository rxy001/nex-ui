import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PieChart from '../../svg/filled/pie-chart.svg'
import type { IconProps } from '../../types'

export const PieChartFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PieChart, { className: 'pie-chart-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PieChartFilled.displayName = 'PieChartFilled'
