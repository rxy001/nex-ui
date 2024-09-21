import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Right from '../../svg/outlined/right.svg'
import type { IconProps } from '../../types'

export const RightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Right)
    return <Icon {...props} ref={ref} />
  },
)
