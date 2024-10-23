import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SwapRight from '../../svg/outlined/swap-right.svg'
import type { IconProps } from '../../types'

export const SwapRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SwapRight, { className: 'swap-right-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
