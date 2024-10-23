import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlaySquare from '../../svg/filled/play-square.svg'
import type { IconProps } from '../../types'

export const PlaySquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PlaySquare, { className: 'play-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
