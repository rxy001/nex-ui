'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Like from '../../svg/outlined/like.svg'
import type { IconProps } from '../../types'

export const LikeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Like, { className: 'like-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LikeOutlined.displayName = 'LikeOutlined'
