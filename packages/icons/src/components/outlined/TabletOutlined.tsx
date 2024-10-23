import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tablet from '../../svg/outlined/tablet.svg'
import type { IconProps } from '../../types'

export const TabletOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Tablet, { className: 'tablet-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
