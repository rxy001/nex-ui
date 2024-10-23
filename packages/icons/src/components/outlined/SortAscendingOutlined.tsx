import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SortAscending from '../../svg/outlined/sort-ascending.svg'
import type { IconProps } from '../../types'

export const SortAscendingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SortAscending, {
      className: 'sort-ascending-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
