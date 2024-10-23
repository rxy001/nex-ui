import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TrademarkCircle from '../../svg/filled/trademark-circle.svg'
import type { IconProps } from '../../types'

export const TrademarkCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TrademarkCircle, {
      className: 'trademark-circle-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
