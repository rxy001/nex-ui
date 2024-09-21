import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Twitch from '../../svg/filled/twitch.svg'
import type { IconProps } from '../../types'

export const TwitchFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Twitch)
  return <Icon {...props} ref={ref} />
})
