import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Filter from '../../svg/outlined/filter.svg'
import type { IconProps } from '../../types'

export const FilterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Filter, { className: 'filter-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
