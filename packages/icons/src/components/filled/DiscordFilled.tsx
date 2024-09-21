import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Discord from '../../svg/filled/discord.svg'
import type { IconProps } from '../../types'

export const DiscordFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Discord)
    return <Icon {...props} ref={ref} />
  },
)
