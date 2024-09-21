import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Partition from '../../svg/outlined/partition.svg'
import type { IconProps } from '../../types'

export const PartitionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Partition)
    return <Icon {...props} ref={ref} />
  },
)
