import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Trophy from '../../svg/filled/trophy.svg'
import type { IconProps } from '../../types'

export const TrophyFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Trophy, { className: 'trophy-filled' })
  return <Icon {...props} ref={ref} />
})
