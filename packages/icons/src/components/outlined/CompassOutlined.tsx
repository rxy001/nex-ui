import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Compass from '../../svg/outlined/compass.svg'
import type { IconProps } from '../../types'

export const CompassOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Compass)
    return <Icon {...props} ref={ref} />
  },
)
