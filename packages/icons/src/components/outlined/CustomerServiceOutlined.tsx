'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CustomerService from '../../svg/outlined/customer-service.svg'
import type { IconProps } from '../../types'

export const CustomerServiceOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(CustomerService, { className: 'customer-service-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CustomerServiceOutlined.displayName = 'CustomerServiceOutlined'
