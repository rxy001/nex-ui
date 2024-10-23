import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CarryOut from '../../svg/outlined/carry-out.svg'
import type { IconProps } from '../../types'

export const CarryOutOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CarryOut, { className: 'carry-out-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
