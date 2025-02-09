'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Percentage from '../../svg/outlined/percentage.svg'
import type { IconProps } from '../../types'

export const PercentageOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Percentage, { className: 'percentage-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PercentageOutlined.displayName = 'PercentageOutlined'
