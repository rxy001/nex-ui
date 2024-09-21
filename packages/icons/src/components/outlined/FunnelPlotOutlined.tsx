import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FunnelPlot from '../../svg/outlined/funnel-plot.svg'
import type { IconProps } from '../../types'

export const FunnelPlotOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FunnelPlot)
    return <Icon {...props} ref={ref} />
  },
)
