'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Cluster from '../../svg/outlined/cluster.svg'
import type { IconProps } from '../../types'

export const ClusterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Cluster, { className: 'cluster-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ClusterOutlined.displayName = 'ClusterOutlined'
