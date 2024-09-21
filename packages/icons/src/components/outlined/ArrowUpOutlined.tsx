import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowUp from '../../svg/outlined/arrow-up.svg'
import type { IconProps } from '../../types'

export const ArrowUpOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ArrowUp)
    return <Icon {...props} ref={ref} />
  },
)
