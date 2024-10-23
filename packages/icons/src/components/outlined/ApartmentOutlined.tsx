import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Apartment from '../../svg/outlined/apartment.svg'
import type { IconProps } from '../../types'

export const ApartmentOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Apartment, { className: 'apartment-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
