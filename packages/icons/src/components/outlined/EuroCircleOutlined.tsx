import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import EuroCircle from '../../svg/outlined/euro-circle.svg'
import type { IconProps } from '../../types'

export const EuroCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(EuroCircle)
    return <Icon {...props} ref={ref} />
  },
)
