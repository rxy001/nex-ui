import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePpt from '../../svg/outlined/file-ppt.svg'
import type { IconProps } from '../../types'

export const FilePptOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FilePpt, { className: 'file-ppt-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
