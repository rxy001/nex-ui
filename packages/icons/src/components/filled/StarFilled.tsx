import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Star from '../../svg/filled/star.svg'
import type { IconProps } from '../../types'

export const StarFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Star, { className: 'star-filled' })
  return <Icon {...props} ref={ref} />
})
