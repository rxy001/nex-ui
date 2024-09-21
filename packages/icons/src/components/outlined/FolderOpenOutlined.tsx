import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderOpen from '../../svg/outlined/folder-open.svg'
import type { IconProps } from '../../types'

export const FolderOpenOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FolderOpen)
    return <Icon {...props} ref={ref} />
  },
)
