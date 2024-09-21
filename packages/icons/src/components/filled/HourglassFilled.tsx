import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hourglass from '../../svg/filled/hourglass.svg'
import type { IconProps } from '../../types'

export const HourglassFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Hourglass)
    return <Icon {...props} ref={ref} />
  },
)
