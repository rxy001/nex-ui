import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Transaction from '../../svg/outlined/transaction.svg'
import type { IconProps } from '../../types'

export const TransactionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Transaction)
    return <Icon {...props} ref={ref} />
  },
)
