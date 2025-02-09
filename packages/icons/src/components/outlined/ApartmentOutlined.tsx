'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Apartment from '../../svg/outlined/apartment.svg'
import type { IconProps } from '../../types'

export const ApartmentOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Apartment, { className: 'apartment-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ApartmentOutlined.displayName = 'ApartmentOutlined'
