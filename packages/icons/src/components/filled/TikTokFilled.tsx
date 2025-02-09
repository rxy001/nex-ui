'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TikTok from '../../svg/filled/tik-tok.svg'
import type { IconProps } from '../../types'

export const TikTokFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TikTok, { className: 'tik-tok-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TikTokFilled.displayName = 'TikTokFilled'
