import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ToTop from '../../svg/outlined/to-top.svg'
import type { IconProps } from '../../types'

export const ToTopOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ToTop)
    return <Icon {...props} ref={ref} />
  },
)
