import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PicCenter from '../../svg/outlined/pic-center.svg'
import type { IconProps } from '../../types'

export const PicCenterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PicCenter)
    return <Icon {...props} ref={ref} />
  },
)
