'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Heart from '../../svg/filled/heart.svg'
import type { IconProps } from '../../types'

export const HeartFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Heart, { className: 'heart-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HeartFilled.displayName = 'HeartFilled'
