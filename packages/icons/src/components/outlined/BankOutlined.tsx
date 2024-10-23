import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bank from '../../svg/outlined/bank.svg'
import type { IconProps } from '../../types'

export const BankOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bank, { className: 'bank-outlined' })
  return <Icon {...props} ref={ref} />
})
