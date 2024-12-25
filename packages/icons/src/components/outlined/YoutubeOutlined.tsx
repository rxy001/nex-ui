import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Youtube from '../../svg/outlined/youtube.svg'
import type { IconProps } from '../../types'

export const YoutubeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Youtube, { className: 'youtube-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
