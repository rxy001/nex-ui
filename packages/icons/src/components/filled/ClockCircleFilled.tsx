'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ClockCircle from '../../svg/filled/clock-circle.svg'
import type { IconProps } from '../../types'

export const ClockCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ClockCircle, { className: 'clock-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ClockCircleFilled.displayName = 'ClockCircleFilled'
