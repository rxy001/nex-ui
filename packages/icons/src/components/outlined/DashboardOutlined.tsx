'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dashboard from '../../svg/outlined/dashboard.svg'
import type { IconProps } from '../../types'

export const DashboardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dashboard, { className: 'dashboard-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DashboardOutlined.displayName = 'DashboardOutlined'
