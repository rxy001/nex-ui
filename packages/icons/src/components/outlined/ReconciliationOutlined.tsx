import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Reconciliation from '../../svg/outlined/reconciliation.svg'
import type { IconProps } from '../../types'

export const ReconciliationOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Reconciliation)
    return <Icon {...props} ref={ref} />
  },
)
