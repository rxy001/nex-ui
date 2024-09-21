import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PauseCircle from '../../svg/filled/pause-circle.svg'
import type { IconProps } from '../../types'

export const PauseCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PauseCircle)
    return <Icon {...props} ref={ref} />
  },
)
