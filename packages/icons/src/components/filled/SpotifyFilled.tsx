import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Spotify from '../../svg/filled/spotify.svg'
import type { IconProps } from '../../types'

export const SpotifyFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Spotify, { className: 'spotify-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SpotifyFilled.displayName = 'SpotifyFilled'
