import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Discord from '../../svg/outlined/discord.svg'
import type { IconProps } from '../../types'

export const DiscordOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Discord, { className: 'discord-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DiscordOutlined.displayName = 'DiscordOutlined'
