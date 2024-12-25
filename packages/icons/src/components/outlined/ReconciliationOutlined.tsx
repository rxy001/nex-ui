import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reconciliation from '../../svg/outlined/reconciliation.svg'
import type { IconProps } from '../../types'

export const ReconciliationOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(Reconciliation, { className: 'reconciliation-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
