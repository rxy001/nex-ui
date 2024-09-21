import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SecurityScan from '../../svg/outlined/security-scan.svg'
import type { IconProps } from '../../types'

export const SecurityScanOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SecurityScan)
    return <Icon {...props} ref={ref} />
  },
)
