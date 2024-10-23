import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderlessTable from '../../svg/outlined/borderless-table.svg'
import type { IconProps } from '../../types'

export const BorderlessTableOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderlessTable, {
      className: 'borderless-table-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
