import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Heart from '../../svg/outlined/heart.svg'
import type { IconProps } from '../../types'

export const HeartOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Heart, { className: 'heart-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
