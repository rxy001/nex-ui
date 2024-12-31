import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Filter from '../../svg/outlined/filter.svg'
import type { IconProps } from '../../types'

export const FilterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Filter, { className: 'filter-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FilterOutlined.displayName = 'FilterOutlined'
