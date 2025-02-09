'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sound from '../../svg/filled/sound.svg'
import type { IconProps } from '../../types'

export const SoundFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sound, { className: 'sound-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SoundFilled.displayName = 'SoundFilled'
