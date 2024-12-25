import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AreaChart from '../../svg/outlined/area-chart.svg'
import type { IconProps } from '../../types'

export const AreaChartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AreaChart, { className: 'area-chart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
