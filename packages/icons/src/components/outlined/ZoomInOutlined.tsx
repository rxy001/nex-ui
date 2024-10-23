import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZoomIn from '../../svg/outlined/zoom-in.svg'
import type { IconProps } from '../../types'

export const ZoomInOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ZoomIn, { className: 'zoom-in-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
