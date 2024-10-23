import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TikTok from '../../svg/outlined/tik-tok.svg'
import type { IconProps } from '../../types'

export const TikTokOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TikTok, { className: 'tik-tok-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
