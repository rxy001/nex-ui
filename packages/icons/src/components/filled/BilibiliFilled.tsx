'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bilibili from '../../svg/filled/bilibili.svg'
import type { IconProps } from '../../types'

export const BilibiliFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bilibili, { className: 'bilibili-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BilibiliFilled.displayName = 'BilibiliFilled'
