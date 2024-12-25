import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Truck from '../../svg/filled/truck.svg'
import type { IconProps } from '../../types'

export const TruckFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Truck, { className: 'truck-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
