import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileSync from '../../svg/outlined/file-sync.svg'
import type { IconProps } from '../../types'

export const FileSyncOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileSync, { className: 'file-sync-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileSyncOutlined.displayName = 'FileSyncOutlined'
