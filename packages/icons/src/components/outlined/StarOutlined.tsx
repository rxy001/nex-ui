import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Star from '../../svg/outlined/star.svg'
import type { IconProps } from '../../types'

export const StarOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Star, { className: 'star-outlined' })
  return <Icon {...props} ref={ref} />
})
