import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileZip from '../../svg/filled/file-zip.svg'
import type { IconProps } from '../../types'

export const FileZipFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileZip, { className: 'file-zip-filled' })
    return <Icon {...props} ref={ref} />
  },
)
