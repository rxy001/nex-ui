'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Audio from '../../svg/outlined/audio.svg'
import type { IconProps } from '../../types'

export const AudioOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Audio, { className: 'audio-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AudioOutlined.displayName = 'AudioOutlined'
