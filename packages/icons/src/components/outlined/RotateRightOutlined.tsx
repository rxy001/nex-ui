import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RotateRight from '../../svg/outlined/rotate-right.svg'
import type { IconProps } from '../../types'

export const RotateRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RotateRight, { className: 'rotate-right-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
