import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PoundCircle from '../../svg/outlined/pound-circle.svg'
import type { IconProps } from '../../types'

export const PoundCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PoundCircle)
    return <Icon {...props} ref={ref} />
  },
)
