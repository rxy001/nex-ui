import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Instagram from '../../svg/outlined/instagram.svg'
import type { IconProps } from '../../types'

export const InstagramOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Instagram, { className: 'instagram-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
