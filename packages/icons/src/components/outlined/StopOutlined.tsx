'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Stop from '../../svg/outlined/stop.svg'
import type { IconProps } from '../../types'

export const StopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Stop, { className: 'stop-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

StopOutlined.displayName = 'StopOutlined'
