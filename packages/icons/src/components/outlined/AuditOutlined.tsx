import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Audit from '../../svg/outlined/audit.svg'
import type { IconProps } from '../../types'

export const AuditOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Audit, { className: 'audit-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
