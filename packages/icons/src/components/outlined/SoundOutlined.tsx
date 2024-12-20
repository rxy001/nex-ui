import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sound from '../../svg/outlined/sound.svg'
import type { IconProps } from '../../types'

export const SoundOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Sound, { className: 'sound-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
