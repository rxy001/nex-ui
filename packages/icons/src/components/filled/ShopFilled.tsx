import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shop from '../../svg/filled/shop.svg'
import type { IconProps } from '../../types'

export const ShopFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Shop, { className: 'shop-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
