import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tablet from '../../svg/outlined/tablet.svg'
import type { IconProps } from '../../types'

export const TabletOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Tablet, { className: 'tablet-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TabletOutlined.displayName = 'TabletOutlined'
