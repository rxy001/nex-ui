import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Download from '../../svg/outlined/download.svg'
import type { IconProps } from '../../types'

export const DownloadOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Download, { className: 'download-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DownloadOutlined.displayName = 'DownloadOutlined'
