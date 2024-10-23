import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderOpen from '../../svg/filled/folder-open.svg'
import type { IconProps } from '../../types'

export const FolderOpenFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FolderOpen, { className: 'folder-open-filled' })
    return <Icon {...props} ref={ref} />
  },
)
