import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BoxPlot from '../../svg/outlined/box-plot.svg'
import type { IconProps } from '../../types'

export const BoxPlotOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BoxPlot)
    return <Icon {...props} ref={ref} />
  },
)
