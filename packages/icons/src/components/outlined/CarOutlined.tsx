import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Car from '../../svg/outlined/car.svg'
import type { IconProps } from '../../types'

export const CarOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Car, { className: 'car-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
