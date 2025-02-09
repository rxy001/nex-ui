'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Spotify from '../../svg/outlined/spotify.svg'
import type { IconProps } from '../../types'

export const SpotifyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Spotify, { className: 'spotify-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SpotifyOutlined.displayName = 'SpotifyOutlined'
