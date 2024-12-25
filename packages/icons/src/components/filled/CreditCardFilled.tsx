import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CreditCard from '../../svg/filled/credit-card.svg'
import type { IconProps } from '../../types'

export const CreditCardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CreditCard, { className: 'credit-card-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
