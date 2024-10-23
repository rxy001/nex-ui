import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CreditCard from '../../svg/filled/credit-card.svg'
import type { IconProps } from '../../types'

export const CreditCardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CreditCard, { className: 'credit-card-filled' })
    return <Icon {...props} ref={ref} />
  },
)
