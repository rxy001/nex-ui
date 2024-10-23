import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Camera from '../../svg/outlined/camera.svg'
import type { IconProps } from '../../types'

export const CameraOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Camera, { className: 'camera-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
