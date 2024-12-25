import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileSearch from '../../svg/outlined/file-search.svg'
import type { IconProps } from '../../types'

export const FileSearchOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileSearch, { className: 'file-search-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
