import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightCircle from '../../svg/outlined/right-circle.svg'
import type { IconProps } from '../../types'

export const RightCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RightCircle, { className: 'right-circle-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
