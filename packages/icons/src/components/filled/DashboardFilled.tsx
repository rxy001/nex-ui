'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dashboard from '../../svg/filled/dashboard.svg'
import type { IconProps } from '../../types'

export const DashboardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dashboard, { className: 'dashboard-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DashboardFilled.displayName = 'DashboardFilled'
