import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SortDescending from '../../svg/outlined/sort-descending.svg'
import type { IconProps } from '../../types'

export const SortDescendingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(SortDescending, { className: 'sort-descending-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SortDescendingOutlined.displayName = 'SortDescendingOutlined'
