import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Audio from '../../svg/filled/audio.svg'
import type { IconProps } from '../../types'

export const AudioFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Audio)
  return <Icon {...props} ref={ref} />
})
