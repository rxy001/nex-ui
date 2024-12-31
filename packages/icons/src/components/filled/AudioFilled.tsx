import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Audio from '../../svg/filled/audio.svg'
import type { IconProps } from '../../types'

export const AudioFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Audio, { className: 'audio-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AudioFilled.displayName = 'AudioFilled'
