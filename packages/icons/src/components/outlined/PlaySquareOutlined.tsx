import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlaySquare from '../../svg/outlined/play-square.svg'
import type { IconProps } from '../../types'

export const PlaySquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlaySquare, { className: 'play-square-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
