import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TrademarkCircle from '../../svg/outlined/trademark-circle.svg'
import type { IconProps } from '../../types'

export const TrademarkCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TrademarkCircle, {
      className: 'trademark-circle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
