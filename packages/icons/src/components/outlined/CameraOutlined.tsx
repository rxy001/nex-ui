import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Camera from '../../svg/outlined/camera.svg'
import type { IconProps } from '../../types'

export const CameraOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Camera, { className: 'camera-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
