import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Like from '../../svg/filled/like.svg'
import type { IconProps } from '../../types'

export const LikeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Like, { className: 'like-filled' })
  return <Icon {...props} ref={ref} />
})
