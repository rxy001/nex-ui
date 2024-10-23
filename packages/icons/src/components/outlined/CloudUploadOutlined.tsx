import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudUpload from '../../svg/outlined/cloud-upload.svg'
import type { IconProps } from '../../types'

export const CloudUploadOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CloudUpload, { className: 'cloud-upload-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
