import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yahoo from '../../svg/outlined/yahoo.svg'
import type { IconProps } from '../../types'

export const YahooOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Yahoo, { className: 'yahoo-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

YahooOutlined.displayName = 'YahooOutlined'
