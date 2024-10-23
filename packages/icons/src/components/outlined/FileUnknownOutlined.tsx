import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileUnknown from '../../svg/outlined/file-unknown.svg'
import type { IconProps } from '../../types'

export const FileUnknownOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileUnknown, { className: 'file-unknown-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
