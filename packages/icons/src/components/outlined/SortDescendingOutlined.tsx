import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SortDescending from '../../svg/outlined/sort-descending.svg'
import type { IconProps } from '../../types'

export const SortDescendingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SortDescending, {
      className: 'sort-descending-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
