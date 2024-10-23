import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dashboard from '../../svg/outlined/dashboard.svg'
import type { IconProps } from '../../types'

export const DashboardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dashboard, { className: 'dashboard-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
