import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Swap from '../../svg/outlined/swap.svg'
import type { IconProps } from '../../types'

export const SwapOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Swap, { className: 'swap-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
