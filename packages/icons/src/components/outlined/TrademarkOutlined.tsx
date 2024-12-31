import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Trademark from '../../svg/outlined/trademark.svg'
import type { IconProps } from '../../types'

export const TrademarkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Trademark, { className: 'trademark-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TrademarkOutlined.displayName = 'TrademarkOutlined'
