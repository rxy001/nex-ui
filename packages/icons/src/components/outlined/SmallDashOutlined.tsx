import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SmallDash from '../../svg/outlined/small-dash.svg'
import type { IconProps } from '../../types'

export const SmallDashOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SmallDash, { className: 'small-dash-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
