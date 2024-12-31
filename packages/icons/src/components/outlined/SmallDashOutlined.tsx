import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SmallDash from '../../svg/outlined/small-dash.svg'
import type { IconProps } from '../../types'

export const SmallDashOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SmallDash, { className: 'small-dash-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SmallDashOutlined.displayName = 'SmallDashOutlined'
