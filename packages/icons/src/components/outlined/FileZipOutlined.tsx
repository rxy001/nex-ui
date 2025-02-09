'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileZip from '../../svg/outlined/file-zip.svg'
import type { IconProps } from '../../types'

export const FileZipOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileZip, { className: 'file-zip-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileZipOutlined.displayName = 'FileZipOutlined'
