import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VideoCamera from '../../svg/filled/video-camera.svg'
import type { IconProps } from '../../types'

export const VideoCameraFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VideoCamera)
    return <Icon {...props} ref={ref} />
  },
)
