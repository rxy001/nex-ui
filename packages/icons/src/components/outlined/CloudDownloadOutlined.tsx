import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudDownload from '../../svg/outlined/cloud-download.svg'
import type { IconProps } from '../../types'

export const CloudDownloadOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloudDownload, {
      className: 'cloud-download-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
