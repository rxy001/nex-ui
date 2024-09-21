import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shop from '../../svg/outlined/shop.svg'
import type { IconProps } from '../../types'

export const ShopOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Shop)
  return <Icon {...props} ref={ref} />
})
