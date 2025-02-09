'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SwapRight from '../../svg/outlined/swap-right.svg'
import type { IconProps } from '../../types'

export const SwapRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SwapRight, { className: 'swap-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SwapRightOutlined.displayName = 'SwapRightOutlined'
