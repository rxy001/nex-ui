import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CreditCard from '../../svg/outlined/credit-card.svg'
import type { IconProps } from '../../types'

export const CreditCardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CreditCard)
    return <Icon {...props} ref={ref} />
  },
)
