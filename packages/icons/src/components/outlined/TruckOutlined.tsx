import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Truck from '../../svg/outlined/truck.svg'
import type { IconProps } from '../../types'

export const TruckOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Truck, { className: 'truck-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TruckOutlined.displayName = 'TruckOutlined'
