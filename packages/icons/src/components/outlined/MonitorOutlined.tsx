import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Monitor from '../../svg/outlined/monitor.svg'
import type { IconProps } from '../../types'

export const MonitorOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Monitor)
    return <Icon {...props} ref={ref} />
  },
)
