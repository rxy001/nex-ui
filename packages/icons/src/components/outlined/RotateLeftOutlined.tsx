import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RotateLeft from '../../svg/outlined/rotate-left.svg'
import type { IconProps } from '../../types'

export const RotateLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RotateLeft)
    return <Icon {...props} ref={ref} />
  },
)
