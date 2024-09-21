import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderView from '../../svg/outlined/folder-view.svg'
import type { IconProps } from '../../types'

export const FolderViewOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FolderView)
    return <Icon {...props} ref={ref} />
  },
)
