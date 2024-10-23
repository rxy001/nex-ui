import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Audio from '../../svg/outlined/audio.svg'
import type { IconProps } from '../../types'

export const AudioOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Audio, { className: 'audio-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
