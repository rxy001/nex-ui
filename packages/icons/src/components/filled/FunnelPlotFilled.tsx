import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FunnelPlot from '../../svg/filled/funnel-plot.svg'
import type { IconProps } from '../../types'

export const FunnelPlotFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FunnelPlot, { className: 'funnel-plot-filled' })
    return <Icon {...props} ref={ref} />
  },
)
