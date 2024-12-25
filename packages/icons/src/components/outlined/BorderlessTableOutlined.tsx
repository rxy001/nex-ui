import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderlessTable from '../../svg/outlined/borderless-table.svg'
import type { IconProps } from '../../types'

export const BorderlessTableOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(BorderlessTable, { className: 'borderless-table-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
