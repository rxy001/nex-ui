import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Partition from '../../svg/outlined/partition.svg'
import type { IconProps } from '../../types'

export const PartitionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Partition, { className: 'partition-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PartitionOutlined.displayName = 'PartitionOutlined'
