import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExcel from '../../svg/filled/file-excel.svg'
import type { IconProps } from '../../types'

export const FileExcelFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileExcel, { className: 'file-excel-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
