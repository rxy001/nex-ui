import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CustomerService from '../../svg/filled/customer-service.svg'
import type { IconProps } from '../../types'

export const CustomerServiceFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(CustomerService, { className: 'customer-service-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CustomerServiceFilled.displayName = 'CustomerServiceFilled'
