import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CarryOut from '../../svg/filled/carry-out.svg'
import type { IconProps } from '../../types'

export const CarryOutFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CarryOut, { className: 'carry-out-filled' })
    return <Icon {...props} ref={ref} />
  },
)
