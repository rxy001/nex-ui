import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlayCircle from '../../svg/outlined/play-circle.svg'
import type { IconProps } from '../../types'

export const PlayCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlayCircle, { className: 'play-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlayCircleOutlined.displayName = 'PlayCircleOutlined'
