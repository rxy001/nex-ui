import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hourglass from '../../svg/outlined/hourglass.svg'
import type { IconProps } from '../../types'

export const HourglassOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Hourglass, { className: 'hourglass-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HourglassOutlined.displayName = 'HourglassOutlined'
