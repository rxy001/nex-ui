import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sound from '../../svg/filled/sound.svg'
import type { IconProps } from '../../types'

export const SoundFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Sound, { className: 'sound-filled' })
  return <Icon {...props} ref={ref} />
})
