import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudSync from '../../svg/outlined/cloud-sync.svg'
import type { IconProps } from '../../types'

export const CloudSyncOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloudSync)
    return <Icon {...props} ref={ref} />
  },
)
