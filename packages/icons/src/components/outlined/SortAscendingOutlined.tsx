import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SortAscending from '../../svg/outlined/sort-ascending.svg'
import type { IconProps } from '../../types'

export const SortAscendingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SortAscending, { className: 'sort-ascending-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
