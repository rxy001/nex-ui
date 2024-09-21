import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Swap from '../../svg/outlined/swap.svg'
import type { IconProps } from '../../types'

export const SwapOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Swap)
  return <Icon {...props} ref={ref} />
})
