import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sync from '../../svg/outlined/sync.svg'
import type { IconProps } from '../../types'

export const SyncOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Sync)
  return <Icon {...props} ref={ref} />
})
