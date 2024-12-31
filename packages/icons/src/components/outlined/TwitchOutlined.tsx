import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Twitch from '../../svg/outlined/twitch.svg'
import type { IconProps } from '../../types'

export const TwitchOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Twitch, { className: 'twitch-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TwitchOutlined.displayName = 'TwitchOutlined'
