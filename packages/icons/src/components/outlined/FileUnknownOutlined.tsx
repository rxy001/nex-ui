'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileUnknown from '../../svg/outlined/file-unknown.svg'
import type { IconProps } from '../../types'

export const FileUnknownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileUnknown, { className: 'file-unknown-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileUnknownOutlined.displayName = 'FileUnknownOutlined'
