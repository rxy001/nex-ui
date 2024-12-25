import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileZip from '../../svg/filled/file-zip.svg'
import type { IconProps } from '../../types'

export const FileZipFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileZip, { className: 'file-zip-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
