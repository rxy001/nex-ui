import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileText from '../../svg/outlined/file-text.svg'
import type { IconProps } from '../../types'

export const FileTextOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileText)
    return <Icon {...props} ref={ref} />
  },
)
