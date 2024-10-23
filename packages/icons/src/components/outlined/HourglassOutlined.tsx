import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hourglass from '../../svg/outlined/hourglass.svg'
import type { IconProps } from '../../types'

export const HourglassOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Hourglass, { className: 'hourglass-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
