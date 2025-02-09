'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sliders from '../../svg/outlined/sliders.svg'
import type { IconProps } from '../../types'

export const SlidersOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sliders, { className: 'sliders-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SlidersOutlined.displayName = 'SlidersOutlined'
