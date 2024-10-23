import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DoubleRight from '../../svg/outlined/double-right.svg'
import type { IconProps } from '../../types'

export const DoubleRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DoubleRight, { className: 'double-right-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
