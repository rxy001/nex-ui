'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hourglass from '../../svg/filled/hourglass.svg'
import type { IconProps } from '../../types'

export const HourglassFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Hourglass, { className: 'hourglass-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HourglassFilled.displayName = 'HourglassFilled'
