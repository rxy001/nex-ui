import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Search from '../../svg/outlined/search.svg'
import type { IconProps } from '../../types'

export const SearchOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Search, { className: 'search-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
