import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudDownload from '../../svg/outlined/cloud-download.svg'
import type { IconProps } from '../../types'

export const CloudDownloadOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloudDownload, { className: 'cloud-download-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
