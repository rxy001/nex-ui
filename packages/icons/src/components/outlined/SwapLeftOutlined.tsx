'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SwapLeft from '../../svg/outlined/swap-left.svg'
import type { IconProps } from '../../types'

export const SwapLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SwapLeft, { className: 'swap-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SwapLeftOutlined.displayName = 'SwapLeftOutlined'
