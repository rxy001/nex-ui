import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hdd from '../../svg/outlined/hdd.svg'
import type { IconProps } from '../../types'

export const HddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Hdd, { className: 'hdd-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
