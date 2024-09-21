import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reconciliation from '../../svg/filled/reconciliation.svg'
import type { IconProps } from '../../types'

export const ReconciliationFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Reconciliation)
    return <Icon {...props} ref={ref} />
  },
)
