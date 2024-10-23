import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shopping from '../../svg/filled/shopping.svg'
import type { IconProps } from '../../types'

export const ShoppingFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Shopping, { className: 'shopping-filled' })
    return <Icon {...props} ref={ref} />
  },
)
