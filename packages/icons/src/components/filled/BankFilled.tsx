import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bank from '../../svg/filled/bank.svg'
import type { IconProps } from '../../types'

export const BankFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Bank, { className: 'bank-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

BankFilled.displayName = 'BankFilled'
