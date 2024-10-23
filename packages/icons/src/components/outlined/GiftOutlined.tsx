import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gift from '../../svg/outlined/gift.svg'
import type { IconProps } from '../../types'

export const GiftOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Gift, { className: 'gift-outlined' })
  return <Icon {...props} ref={ref} />
})
