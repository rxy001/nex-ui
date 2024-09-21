import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusBottomleft from '../../svg/outlined/radius-bottomleft.svg'
import type { IconProps } from '../../types'

export const RadiusBottomleftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RadiusBottomleft)
    return <Icon {...props} ref={ref} />
  },
)
