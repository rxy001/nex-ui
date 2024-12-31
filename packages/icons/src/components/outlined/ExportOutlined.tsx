import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Export from '../../svg/outlined/export.svg'
import type { IconProps } from '../../types'

export const ExportOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Export, { className: 'export-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExportOutlined.displayName = 'ExportOutlined'
