import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Scan from '../../svg/outlined/scan.svg'
import type { IconProps } from '../../types'

export const ScanOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Scan, { className: 'scan-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ScanOutlined.displayName = 'ScanOutlined'
