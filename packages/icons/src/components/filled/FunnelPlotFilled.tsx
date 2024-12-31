import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FunnelPlot from '../../svg/filled/funnel-plot.svg'
import type { IconProps } from '../../types'

export const FunnelPlotFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FunnelPlot, { className: 'funnel-plot-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FunnelPlotFilled.displayName = 'FunnelPlotFilled'
