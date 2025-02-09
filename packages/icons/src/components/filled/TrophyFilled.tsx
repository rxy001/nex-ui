'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Trophy from '../../svg/filled/trophy.svg'
import type { IconProps } from '../../types'

export const TrophyFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Trophy, { className: 'trophy-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TrophyFilled.displayName = 'TrophyFilled'
