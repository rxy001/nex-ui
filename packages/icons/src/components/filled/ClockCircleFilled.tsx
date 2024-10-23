import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ClockCircle from '../../svg/filled/clock-circle.svg'
import type { IconProps } from '../../types'

export const ClockCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ClockCircle, { className: 'clock-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
