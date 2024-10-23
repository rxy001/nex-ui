import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZoomOut from '../../svg/outlined/zoom-out.svg'
import type { IconProps } from '../../types'

export const ZoomOutOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ZoomOut, { className: 'zoom-out-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
