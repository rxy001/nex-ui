import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reconciliation from '../../svg/filled/reconciliation.svg'
import type { IconProps } from '../../types'

export const ReconciliationFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Reconciliation, { className: 'reconciliation-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ReconciliationFilled.displayName = 'ReconciliationFilled'
