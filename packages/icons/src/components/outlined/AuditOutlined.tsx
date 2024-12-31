import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Audit from '../../svg/outlined/audit.svg'
import type { IconProps } from '../../types'

export const AuditOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Audit, { className: 'audit-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AuditOutlined.displayName = 'AuditOutlined'
