import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretUp from '../../svg/filled/caret-up.svg'
import type { IconProps } from '../../types'

export const CaretUpFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CaretUp)
    return <Icon {...props} ref={ref} />
  },
)
