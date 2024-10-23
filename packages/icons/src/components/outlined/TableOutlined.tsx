import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Table from '../../svg/outlined/table.svg'
import type { IconProps } from '../../types'

export const TableOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Table, { className: 'table-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
