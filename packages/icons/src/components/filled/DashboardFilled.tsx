import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dashboard from '../../svg/filled/dashboard.svg'
import type { IconProps } from '../../types'

export const DashboardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dashboard, { className: 'dashboard-filled' })
    return <Icon {...props} ref={ref} />
  },
)
