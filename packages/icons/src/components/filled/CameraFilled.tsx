import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Camera from '../../svg/filled/camera.svg'
import type { IconProps } from '../../types'

export const CameraFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Camera, { className: 'camera-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
