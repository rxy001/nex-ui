import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileText from '../../svg/filled/file-text.svg'
import type { IconProps } from '../../types'

export const FileTextFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileText, { className: 'file-text-filled' })
    return <Icon {...props} ref={ref} />
  },
)
