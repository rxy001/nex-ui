import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretLeft from '../../svg/outlined/caret-left.svg'
import type { IconProps } from '../../types'

export const CaretLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretLeft)
    return <Icon {...props} ref={ref} />
  },
)
