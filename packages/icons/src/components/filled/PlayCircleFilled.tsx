import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlayCircle from '../../svg/filled/play-circle.svg'
import type { IconProps } from '../../types'

export const PlayCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlayCircle, { className: 'play-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlayCircleFilled.displayName = 'PlayCircleFilled'
