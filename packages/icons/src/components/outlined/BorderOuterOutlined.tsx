import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderOuter from '../../svg/outlined/border-outer.svg'
import type { IconProps } from '../../types'

export const BorderOuterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BorderOuter, { className: 'border-outer-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BorderOuterOutlined.displayName = 'BorderOuterOutlined'
