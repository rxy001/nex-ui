import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AudioMuted from '../../svg/outlined/audio-muted.svg'
import type { IconProps } from '../../types'

export const AudioMutedOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AudioMuted, { className: 'audio-muted-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
