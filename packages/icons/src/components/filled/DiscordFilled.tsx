import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Discord from '../../svg/filled/discord.svg'
import type { IconProps } from '../../types'

export const DiscordFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Discord, { className: 'discord-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
