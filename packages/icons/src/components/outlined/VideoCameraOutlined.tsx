'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VideoCamera from '../../svg/outlined/video-camera.svg'
import type { IconProps } from '../../types'

export const VideoCameraOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(VideoCamera, { className: 'video-camera-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VideoCameraOutlined.displayName = 'VideoCameraOutlined'
