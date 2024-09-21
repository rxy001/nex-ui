import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gateway from '../../svg/outlined/gateway.svg'
import type { IconProps } from '../../types'

export const GatewayOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Gateway)
    return <Icon {...props} ref={ref} />
  },
)
