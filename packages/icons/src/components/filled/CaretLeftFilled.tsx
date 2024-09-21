import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretLeft from '../../svg/filled/caret-left.svg'
import type { IconProps } from '../../types'

export const CaretLeftFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretLeft)
    return <Icon {...props} ref={ref} />
  },
)
