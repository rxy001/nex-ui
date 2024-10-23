import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Twitch from '../../svg/outlined/twitch.svg'
import type { IconProps } from '../../types'

export const TwitchOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Twitch, { className: 'twitch-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
