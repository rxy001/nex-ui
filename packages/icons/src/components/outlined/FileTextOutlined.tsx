'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileText from '../../svg/outlined/file-text.svg'
import type { IconProps } from '../../types'

export const FileTextOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileText, { className: 'file-text-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileTextOutlined.displayName = 'FileTextOutlined'
