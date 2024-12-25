import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calendar from '../../svg/filled/calendar.svg'
import type { IconProps } from '../../types'

export const CalendarFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Calendar, { className: 'calendar-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
