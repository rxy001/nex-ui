'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ClockCircle from '../../svg/outlined/clock-circle.svg'
import type { IconProps } from '../../types'

export const ClockCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ClockCircle, { className: 'clock-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ClockCircleOutlined.displayName = 'ClockCircleOutlined'
