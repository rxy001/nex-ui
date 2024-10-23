import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VideoCameraAdd from '../../svg/outlined/video-camera-add.svg'
import type { IconProps } from '../../types'

export const VideoCameraAddOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VideoCameraAdd, {
      className: 'video-camera-add-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
