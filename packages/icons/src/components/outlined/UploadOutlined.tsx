'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Upload from '../../svg/outlined/upload.svg'
import type { IconProps } from '../../types'

export const UploadOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Upload, { className: 'upload-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UploadOutlined.displayName = 'UploadOutlined'
