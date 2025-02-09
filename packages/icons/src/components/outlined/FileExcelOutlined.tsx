'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExcel from '../../svg/outlined/file-excel.svg'
import type { IconProps } from '../../types'

export const FileExcelOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileExcel, { className: 'file-excel-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileExcelOutlined.displayName = 'FileExcelOutlined'
