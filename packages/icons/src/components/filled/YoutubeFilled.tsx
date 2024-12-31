import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Youtube from '../../svg/filled/youtube.svg'
import type { IconProps } from '../../types'

export const YoutubeFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Youtube, { className: 'youtube-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

YoutubeFilled.displayName = 'YoutubeFilled'
