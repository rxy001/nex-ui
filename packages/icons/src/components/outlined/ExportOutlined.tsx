import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Export from '../../svg/outlined/export.svg'
import type { IconProps } from '../../types'

export const ExportOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Export, { className: 'export-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
