import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Thunderbolt from '../../svg/outlined/thunderbolt.svg'
import type { IconProps } from '../../types'

export const ThunderboltOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Thunderbolt)
    return <Icon {...props} ref={ref} />
  },
)
