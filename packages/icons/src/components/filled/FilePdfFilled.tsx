import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePdf from '../../svg/filled/file-pdf.svg'
import type { IconProps } from '../../types'

export const FilePdfFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FilePdf)
    return <Icon {...props} ref={ref} />
  },
)
