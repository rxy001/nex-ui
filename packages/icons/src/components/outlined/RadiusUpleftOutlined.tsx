import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusUpleft from '../../svg/outlined/radius-upleft.svg'
import type { IconProps } from '../../types'

export const RadiusUpleftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RadiusUpleft)
    return <Icon {...props} ref={ref} />
  },
)
