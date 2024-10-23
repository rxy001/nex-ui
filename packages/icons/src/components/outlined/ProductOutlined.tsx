import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Product from '../../svg/outlined/product.svg'
import type { IconProps } from '../../types'

export const ProductOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Product, { className: 'product-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
