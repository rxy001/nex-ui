import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Spotify from '../../svg/filled/spotify.svg'
import type { IconProps } from '../../types'

export const SpotifyFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Spotify, { className: 'spotify-filled' })
    return <Icon {...props} ref={ref} />
  },
)
