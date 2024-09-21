import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileProtect from '../../svg/outlined/file-protect.svg'
import type { IconProps } from '../../types'

export const FileProtectOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileProtect)
    return <Icon {...props} ref={ref} />
  },
)
