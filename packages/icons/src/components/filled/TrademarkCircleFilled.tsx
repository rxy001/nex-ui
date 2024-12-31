import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TrademarkCircle from '../../svg/filled/trademark-circle.svg'
import type { IconProps } from '../../types'

export const TrademarkCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(TrademarkCircle, { className: 'trademark-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TrademarkCircleFilled.displayName = 'TrademarkCircleFilled'
