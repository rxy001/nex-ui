import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Search from '../../svg/outlined/search.svg'
import type { IconProps } from '../../types'

export const SearchOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Search, { className: 'search-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
