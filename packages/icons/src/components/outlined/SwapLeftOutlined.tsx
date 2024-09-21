import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SwapLeft from '../../svg/outlined/swap-left.svg'
import type { IconProps } from '../../types'

export const SwapLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SwapLeft)
    return <Icon {...props} ref={ref} />
  },
)
