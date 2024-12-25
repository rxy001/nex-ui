import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderAdd from '../../svg/filled/folder-add.svg'
import type { IconProps } from '../../types'

export const FolderAddFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FolderAdd, { className: 'folder-add-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
