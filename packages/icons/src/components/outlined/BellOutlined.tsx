import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bell from '../../svg/outlined/bell.svg'
import type { IconProps } from '../../types'

export const BellOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bell, { className: 'bell-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BellOutlined.displayName = 'BellOutlined'
