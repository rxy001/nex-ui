'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yahoo from '../../svg/filled/yahoo.svg'
import type { IconProps } from '../../types'

export const YahooFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Yahoo, { className: 'yahoo-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

YahooFilled.displayName = 'YahooFilled'
