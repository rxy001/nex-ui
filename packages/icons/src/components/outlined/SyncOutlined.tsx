import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sync from '../../svg/outlined/sync.svg'
import type { IconProps } from '../../types'

export const SyncOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sync, { className: 'sync-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
