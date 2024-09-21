import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Calendar from '../../svg/outlined/calendar.svg'
import type { IconProps } from '../../types'

export const CalendarOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Calendar)
    return <Icon {...props} ref={ref} />
  },
)
