import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Truck from '../../svg/outlined/truck.svg'
import type { IconProps } from '../../types'

export const TruckOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Truck)
    return <Icon {...props} ref={ref} />
  },
)
