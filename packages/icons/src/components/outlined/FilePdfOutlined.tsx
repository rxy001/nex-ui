import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePdf from '../../svg/outlined/file-pdf.svg'
import type { IconProps } from '../../types'

export const FilePdfOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FilePdf, { className: 'file-pdf-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
