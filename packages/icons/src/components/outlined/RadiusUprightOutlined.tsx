import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusUpright from '../../svg/outlined/radius-upright.svg'
import type { IconProps } from '../../types'

export const RadiusUprightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RadiusUpright)
    return <Icon {...props} ref={ref} />
  },
)
