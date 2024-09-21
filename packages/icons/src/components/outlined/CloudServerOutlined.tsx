import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudServer from '../../svg/outlined/cloud-server.svg'
import type { IconProps } from '../../types'

export const CloudServerOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloudServer)
    return <Icon {...props} ref={ref} />
  },
)
