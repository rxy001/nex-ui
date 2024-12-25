import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FunnelPlot from '../../svg/outlined/funnel-plot.svg'
import type { IconProps } from '../../types'

export const FunnelPlotOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FunnelPlot, { className: 'funnel-plot-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
