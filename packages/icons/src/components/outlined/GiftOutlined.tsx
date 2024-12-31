import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gift from '../../svg/outlined/gift.svg'
import type { IconProps } from '../../types'

export const GiftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Gift, { className: 'gift-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GiftOutlined.displayName = 'GiftOutlined'
