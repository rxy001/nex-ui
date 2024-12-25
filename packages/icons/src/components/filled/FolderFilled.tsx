import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Folder from '../../svg/filled/folder.svg'
import type { IconProps } from '../../types'

export const FolderFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Folder, { className: 'folder-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
