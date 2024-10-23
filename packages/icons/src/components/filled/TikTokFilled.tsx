import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TikTok from '../../svg/filled/tik-tok.svg'
import type { IconProps } from '../../types'

export const TikTokFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(TikTok, { className: 'tik-tok-filled' })
  return <Icon {...props} ref={ref} />
})
