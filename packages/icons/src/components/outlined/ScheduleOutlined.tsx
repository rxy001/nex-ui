import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Schedule from '../../svg/outlined/schedule.svg'
import type { IconProps } from '../../types'

export const ScheduleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Schedule, { className: 'schedule-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
