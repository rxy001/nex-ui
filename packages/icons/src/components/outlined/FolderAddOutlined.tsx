import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderAdd from '../../svg/outlined/folder-add.svg'
import type { IconProps } from '../../types'

export const FolderAddOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FolderAdd)
    return <Icon {...props} ref={ref} />
  },
)
