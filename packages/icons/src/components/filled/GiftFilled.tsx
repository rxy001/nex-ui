import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gift from '../../svg/filled/gift.svg'
import type { IconProps } from '../../types'

export const GiftFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Gift)
  return <Icon {...props} ref={ref} />
})
