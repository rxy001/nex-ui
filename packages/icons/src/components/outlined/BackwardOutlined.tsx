import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Backward from '../../svg/outlined/backward.svg'
import type { IconProps } from '../../types'

export const BackwardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Backward)
    return <Icon {...props} ref={ref} />
  },
)
