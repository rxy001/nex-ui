import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Like from '../../svg/outlined/like.svg'
import type { IconProps } from '../../types'

export const LikeOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Like, { className: 'like-outlined' })
  return <Icon {...props} ref={ref} />
})
