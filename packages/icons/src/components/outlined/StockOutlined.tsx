import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Stock from '../../svg/outlined/stock.svg'
import type { IconProps } from '../../types'

export const StockOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Stock)
    return <Icon {...props} ref={ref} />
  },
)
