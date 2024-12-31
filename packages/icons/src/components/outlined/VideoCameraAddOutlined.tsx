import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VideoCameraAdd from '../../svg/outlined/video-camera-add.svg'
import type { IconProps } from '../../types'

export const VideoCameraAddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(VideoCameraAdd, { className: 'video-camera-add-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VideoCameraAddOutlined.displayName = 'VideoCameraAddOutlined'
