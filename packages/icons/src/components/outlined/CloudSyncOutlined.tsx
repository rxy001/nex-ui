import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudSync from '../../svg/outlined/cloud-sync.svg'
import type { IconProps } from '../../types'

export const CloudSyncOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloudSync, { className: 'cloud-sync-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
