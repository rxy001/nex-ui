import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Youtube from '../../svg/filled/youtube.svg'
import type { IconProps } from '../../types'

export const YoutubeFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Youtube, { className: 'youtube-filled' })
    return <Icon {...props} ref={ref} />
  },
)
