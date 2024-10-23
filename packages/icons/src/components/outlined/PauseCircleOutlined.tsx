import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PauseCircle from '../../svg/outlined/pause-circle.svg'
import type { IconProps } from '../../types'

export const PauseCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PauseCircle, { className: 'pause-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
