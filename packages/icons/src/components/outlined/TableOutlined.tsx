import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Table from '../../svg/outlined/table.svg'
import type { IconProps } from '../../types'

export const TableOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Table, { className: 'table-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TableOutlined.displayName = 'TableOutlined'
