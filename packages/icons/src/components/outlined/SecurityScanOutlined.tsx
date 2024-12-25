import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SecurityScan from '../../svg/outlined/security-scan.svg'
import type { IconProps } from '../../types'

export const SecurityScanOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SecurityScan, { className: 'security-scan-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
