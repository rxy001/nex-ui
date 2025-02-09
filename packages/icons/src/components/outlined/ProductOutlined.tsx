'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Product from '../../svg/outlined/product.svg'
import type { IconProps } from '../../types'

export const ProductOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Product, { className: 'product-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ProductOutlined.displayName = 'ProductOutlined'
