import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Trophy from '../../svg/outlined/trophy.svg'
import type { IconProps } from '../../types'

export const TrophyOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Trophy, { className: 'trophy-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
