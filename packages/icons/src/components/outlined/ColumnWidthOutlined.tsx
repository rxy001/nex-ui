import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ColumnWidth from '../../svg/outlined/column-width.svg'
import type { IconProps } from '../../types'

export const ColumnWidthOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ColumnWidth, { className: 'column-width-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
