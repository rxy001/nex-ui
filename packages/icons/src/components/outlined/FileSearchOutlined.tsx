import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileSearch from '../../svg/outlined/file-search.svg'
import type { IconProps } from '../../types'

export const FileSearchOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileSearch)
    return <Icon {...props} ref={ref} />
  },
)
