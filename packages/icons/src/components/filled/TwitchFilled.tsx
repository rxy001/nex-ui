'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Twitch from '../../svg/filled/twitch.svg'
import type { IconProps } from '../../types'

export const TwitchFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Twitch, { className: 'twitch-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TwitchFilled.displayName = 'TwitchFilled'
