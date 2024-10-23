import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderAdd from '../../svg/filled/folder-add.svg'
import type { IconProps } from '../../types'

export const FolderAddFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FolderAdd, { className: 'folder-add-filled' })
    return <Icon {...props} ref={ref} />
  },
)
