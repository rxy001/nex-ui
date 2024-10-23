import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DoubleLeft from '../../svg/outlined/double-left.svg'
import type { IconProps } from '../../types'

export const DoubleLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DoubleLeft, { className: 'double-left-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
