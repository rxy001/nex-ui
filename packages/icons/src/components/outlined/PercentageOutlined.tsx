import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Percentage from '../../svg/outlined/percentage.svg'
import type { IconProps } from '../../types'

export const PercentageOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Percentage)
    return <Icon {...props} ref={ref} />
  },
)
