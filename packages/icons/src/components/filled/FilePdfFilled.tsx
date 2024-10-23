import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePdf from '../../svg/filled/file-pdf.svg'
import type { IconProps } from '../../types'

export const FilePdfFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FilePdf, { className: 'file-pdf-filled' })
    return <Icon {...props} ref={ref} />
  },
)
