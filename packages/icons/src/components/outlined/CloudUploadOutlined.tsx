'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudUpload from '../../svg/outlined/cloud-upload.svg'
import type { IconProps } from '../../types'

export const CloudUploadOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloudUpload, { className: 'cloud-upload-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloudUploadOutlined.displayName = 'CloudUploadOutlined'
