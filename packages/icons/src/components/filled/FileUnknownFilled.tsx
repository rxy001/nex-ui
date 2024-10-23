import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileUnknown from '../../svg/filled/file-unknown.svg'
import type { IconProps } from '../../types'

export const FileUnknownFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileUnknown, { className: 'file-unknown-filled' })
    return <Icon {...props} ref={ref} />
  },
)
