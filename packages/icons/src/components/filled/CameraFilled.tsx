import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Camera from '../../svg/filled/camera.svg'
import type { IconProps } from '../../types'

export const CameraFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Camera, { className: 'camera-filled' })
  return <Icon {...props} ref={ref} />
})
