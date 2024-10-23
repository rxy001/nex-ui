import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Product from '../../svg/filled/product.svg'
import type { IconProps } from '../../types'

export const ProductFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Product, { className: 'product-filled' })
    return <Icon {...props} ref={ref} />
  },
)
