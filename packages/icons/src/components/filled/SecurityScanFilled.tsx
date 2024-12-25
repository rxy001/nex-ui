import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SecurityScan from '../../svg/filled/security-scan.svg'
import type { IconProps } from '../../types'

export const SecurityScanFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SecurityScan, { className: 'security-scan-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
