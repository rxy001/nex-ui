import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Spotify from '../../svg/outlined/spotify.svg'
import type { IconProps } from '../../types'

export const SpotifyOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Spotify)
    return <Icon {...props} ref={ref} />
  },
)
