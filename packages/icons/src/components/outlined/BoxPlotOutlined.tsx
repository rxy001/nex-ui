'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BoxPlot from '../../svg/outlined/box-plot.svg'
import type { IconProps } from '../../types'

export const BoxPlotOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BoxPlot, { className: 'box-plot-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BoxPlotOutlined.displayName = 'BoxPlotOutlined'
