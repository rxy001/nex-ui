import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Download from '../../svg/outlined/download.svg'
import type { IconProps } from '../../types'

export const DownloadOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Download, { className: 'download-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
