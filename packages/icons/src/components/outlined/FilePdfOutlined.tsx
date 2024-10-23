import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePdf from '../../svg/outlined/file-pdf.svg'
import type { IconProps } from '../../types'

export const FilePdfOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FilePdf, { className: 'file-pdf-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
