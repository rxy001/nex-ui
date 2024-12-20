import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calendar from '../../svg/filled/calendar.svg'
import type { IconProps } from '../../types'

export const CalendarFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Calendar, { className: 'calendar-filled' })
    return <Icon {...props} ref={ref} />
  },
)
