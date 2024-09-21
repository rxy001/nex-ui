import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DollarCircle from '../../svg/outlined/dollar-circle.svg'
import type { IconProps } from '../../types'

export const DollarCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DollarCircle)
    return <Icon {...props} ref={ref} />
  },
)
