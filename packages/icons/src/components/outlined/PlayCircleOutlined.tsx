import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlayCircle from '../../svg/outlined/play-circle.svg'
import type { IconProps } from '../../types'

export const PlayCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlayCircle, { className: 'play-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
