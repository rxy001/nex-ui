import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderAdd from '../../svg/outlined/folder-add.svg'
import type { IconProps } from '../../types'

export const FolderAddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FolderAdd, { className: 'folder-add-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FolderAddOutlined.displayName = 'FolderAddOutlined'
