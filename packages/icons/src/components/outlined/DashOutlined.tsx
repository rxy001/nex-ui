'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dash from '../../svg/outlined/dash.svg'
import type { IconProps } from '../../types'

export const DashOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dash, { className: 'dash-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DashOutlined.displayName = 'DashOutlined'
