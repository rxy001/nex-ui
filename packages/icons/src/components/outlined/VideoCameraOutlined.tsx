import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VideoCamera from '../../svg/outlined/video-camera.svg'
import type { IconProps } from '../../types'

export const VideoCameraOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VideoCamera, { className: 'video-camera-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
