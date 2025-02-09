'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ShoppingCart from '../../svg/outlined/shopping-cart.svg'
import type { IconProps } from '../../types'

export const ShoppingCartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ShoppingCart, { className: 'shopping-cart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ShoppingCartOutlined.displayName = 'ShoppingCartOutlined'
