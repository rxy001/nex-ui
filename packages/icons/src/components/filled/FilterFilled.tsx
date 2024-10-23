import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Filter from '../../svg/filled/filter.svg'
import type { IconProps } from '../../types'

export const FilterFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Filter, { className: 'filter-filled' })
  return <Icon {...props} ref={ref} />
})
