import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Monitor from '../../svg/outlined/monitor.svg'
import type { IconProps } from '../../types'

export const MonitorOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Monitor, { className: 'monitor-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
