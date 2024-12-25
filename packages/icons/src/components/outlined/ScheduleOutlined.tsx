import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Schedule from '../../svg/outlined/schedule.svg'
import type { IconProps } from '../../types'

export const ScheduleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Schedule, { className: 'schedule-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
