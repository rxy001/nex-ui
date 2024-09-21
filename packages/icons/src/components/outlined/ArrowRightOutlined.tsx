import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowRight from '../../svg/outlined/arrow-right.svg'
import type { IconProps } from '../../types'

export const ArrowRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ArrowRight)
    return <Icon {...props} ref={ref} />
  },
)
