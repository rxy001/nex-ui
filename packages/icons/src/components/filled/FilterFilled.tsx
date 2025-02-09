'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Filter from '../../svg/filled/filter.svg'
import type { IconProps } from '../../types'

export const FilterFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Filter, { className: 'filter-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FilterFilled.displayName = 'FilterFilled'
