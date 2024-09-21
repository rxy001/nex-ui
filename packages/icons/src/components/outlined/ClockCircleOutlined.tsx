import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ClockCircle from '../../svg/outlined/clock-circle.svg'
import type { IconProps } from '../../types'

export const ClockCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ClockCircle)
    return <Icon {...props} ref={ref} />
  },
)
