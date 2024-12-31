import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BoxPlot from '../../svg/filled/box-plot.svg'
import type { IconProps } from '../../types'

export const BoxPlotFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BoxPlot, { className: 'box-plot-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BoxPlotFilled.displayName = 'BoxPlotFilled'
