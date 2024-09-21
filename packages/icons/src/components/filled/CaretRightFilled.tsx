import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretRight from '../../svg/filled/caret-right.svg'
import type { IconProps } from '../../types'

export const CaretRightFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretRight)
    return <Icon {...props} ref={ref} />
  },
)
