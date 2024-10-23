import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shop from '../../svg/filled/shop.svg'
import type { IconProps } from '../../types'

export const ShopFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Shop, { className: 'shop-filled' })
  return <Icon {...props} ref={ref} />
})
