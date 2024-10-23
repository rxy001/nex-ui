import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Heart from '../../svg/filled/heart.svg'
import type { IconProps } from '../../types'

export const HeartFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Heart, { className: 'heart-filled' })
  return <Icon {...props} ref={ref} />
})
