import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePdf from '../../svg/filled/file-pdf.svg'
import type { IconProps } from '../../types'

export const FilePdfFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FilePdf, { className: 'file-pdf-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FilePdfFilled.displayName = 'FilePdfFilled'
