import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Youtube from '../../svg/outlined/youtube.svg'
import type { IconProps } from '../../types'

export const YoutubeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Youtube, { className: 'youtube-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
