import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dislike from '../../svg/outlined/dislike.svg'
import type { IconProps } from '../../types'

export const DislikeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dislike, { className: 'dislike-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
