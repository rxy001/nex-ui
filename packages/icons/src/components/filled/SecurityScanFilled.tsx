import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SecurityScan from '../../svg/filled/security-scan.svg'
import type { IconProps } from '../../types'

export const SecurityScanFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SecurityScan, { className: 'security-scan-filled' })
    return <Icon {...props} ref={ref} />
  },
)
