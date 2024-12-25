import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Folder from '../../svg/outlined/folder.svg'
import type { IconProps } from '../../types'

export const FolderOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Folder, { className: 'folder-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
