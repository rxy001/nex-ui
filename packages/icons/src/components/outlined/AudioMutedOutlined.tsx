import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AudioMuted from '../../svg/outlined/audio-muted.svg'
import type { IconProps } from '../../types'

export const AudioMutedOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AudioMuted, { className: 'audio-muted-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
