import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TrademarkCircle from '../../svg/outlined/trademark-circle.svg'
import type { IconProps } from '../../types'

export const TrademarkCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(TrademarkCircle, { className: 'trademark-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
