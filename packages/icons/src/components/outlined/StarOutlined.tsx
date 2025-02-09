'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Star from '../../svg/outlined/star.svg'
import type { IconProps } from '../../types'

export const StarOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Star, { className: 'star-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

StarOutlined.displayName = 'StarOutlined'
