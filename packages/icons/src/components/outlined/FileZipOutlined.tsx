import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileZip from '../../svg/outlined/file-zip.svg'
import type { IconProps } from '../../types'

export const FileZipOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileZip)
    return <Icon {...props} ref={ref} />
  },
)
