import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Schedule from '../../svg/filled/schedule.svg'
import type { IconProps } from '../../types'

export const ScheduleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Schedule, { className: 'schedule-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
