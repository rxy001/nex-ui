'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shop from '../../svg/outlined/shop.svg'
import type { IconProps } from '../../types'

export const ShopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Shop, { className: 'shop-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ShopOutlined.displayName = 'ShopOutlined'
