import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ShoppingCart from '../../svg/outlined/shopping-cart.svg'
import type { IconProps } from '../../types'

export const ShoppingCartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ShoppingCart, {
      className: 'shopping-cart-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
