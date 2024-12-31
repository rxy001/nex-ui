import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CreditCard from '../../svg/outlined/credit-card.svg'
import type { IconProps } from '../../types'

export const CreditCardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CreditCard, { className: 'credit-card-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CreditCardOutlined.displayName = 'CreditCardOutlined'
