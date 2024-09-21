import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Cluster from '../../svg/outlined/cluster.svg'
import type { IconProps } from '../../types'

export const ClusterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Cluster)
    return <Icon {...props} ref={ref} />
  },
)
