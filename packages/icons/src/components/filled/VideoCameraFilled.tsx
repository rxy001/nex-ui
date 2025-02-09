'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VideoCamera from '../../svg/filled/video-camera.svg'
import type { IconProps } from '../../types'

export const VideoCameraFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(VideoCamera, { className: 'video-camera-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VideoCameraFilled.displayName = 'VideoCameraFilled'
