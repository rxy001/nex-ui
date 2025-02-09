'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bank from '../../svg/outlined/bank.svg'
import type { IconProps } from '../../types'

export const BankOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bank, { className: 'bank-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BankOutlined.displayName = 'BankOutlined'
