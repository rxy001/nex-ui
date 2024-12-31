import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Product from '../../svg/filled/product.svg'
import type { IconProps } from '../../types'

export const ProductFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Product, { className: 'product-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ProductFilled.displayName = 'ProductFilled'
