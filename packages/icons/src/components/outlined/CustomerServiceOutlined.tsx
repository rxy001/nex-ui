import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CustomerService from '../../svg/outlined/customer-service.svg'
import type { IconProps } from '../../types'

export const CustomerServiceOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CustomerService)
    return <Icon {...props} ref={ref} />
  },
)
