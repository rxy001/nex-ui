import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import LineChart from '../../svg/outlined/line-chart.svg'
import type { IconProps } from '../../types'

export const LineChartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(LineChart, { className: 'line-chart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
