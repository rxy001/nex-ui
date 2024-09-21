import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DotChart from '../../svg/outlined/dot-chart.svg'
import type { IconProps } from '../../types'

export const DotChartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DotChart)
    return <Icon {...props} ref={ref} />
  },
)
