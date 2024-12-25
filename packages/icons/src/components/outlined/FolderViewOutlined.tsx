import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderView from '../../svg/outlined/folder-view.svg'
import type { IconProps } from '../../types'

export const FolderViewOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FolderView, { className: 'folder-view-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
