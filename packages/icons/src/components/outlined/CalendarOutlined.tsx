import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calendar from '../../svg/outlined/calendar.svg'
import type { IconProps } from '../../types'

export const CalendarOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Calendar, { className: 'calendar-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
