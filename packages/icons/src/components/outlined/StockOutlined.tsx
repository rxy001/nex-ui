'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Stock from '../../svg/outlined/stock.svg'
import type { IconProps } from '../../types'

export const StockOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Stock, { className: 'stock-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

StockOutlined.displayName = 'StockOutlined'
