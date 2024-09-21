import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileSync from '../../svg/outlined/file-sync.svg'
import type { IconProps } from '../../types'

export const FileSyncOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileSync)
    return <Icon {...props} ref={ref} />
  },
)
