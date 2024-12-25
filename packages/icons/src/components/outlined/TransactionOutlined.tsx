import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Transaction from '../../svg/outlined/transaction.svg'
import type { IconProps } from '../../types'

export const TransactionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Transaction, { className: 'transaction-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
