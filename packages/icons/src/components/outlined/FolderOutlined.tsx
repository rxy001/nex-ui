import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Folder from '../../svg/outlined/folder.svg'
import type { IconProps } from '../../types'

export const FolderOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Folder, { className: 'folder-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
