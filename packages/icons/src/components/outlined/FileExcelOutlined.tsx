import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExcel from '../../svg/outlined/file-excel.svg'
import type { IconProps } from '../../types'

export const FileExcelOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileExcel)
    return <Icon {...props} ref={ref} />
  },
)
