import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import HeatMap from '../../svg/outlined/heat-map.svg'
import type { IconProps } from '../../types'

export const HeatMapOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(HeatMap, { className: 'heat-map-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
