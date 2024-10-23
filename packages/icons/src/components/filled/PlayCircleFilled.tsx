import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlayCircle from '../../svg/filled/play-circle.svg'
import type { IconProps } from '../../types'

export const PlayCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlayCircle, { className: 'play-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
