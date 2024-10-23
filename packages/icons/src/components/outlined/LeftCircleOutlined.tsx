import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftCircle from '../../svg/outlined/left-circle.svg'
import type { IconProps } from '../../types'

export const LeftCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(LeftCircle, { className: 'left-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
