import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Schedule from '../../svg/filled/schedule.svg'
import type { IconProps } from '../../types'

export const ScheduleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Schedule)
    return <Icon {...props} ref={ref} />
  },
)
