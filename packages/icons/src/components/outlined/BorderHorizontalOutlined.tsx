import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderHorizontal from '../../svg/outlined/border-horizontal.svg'
import type { IconProps } from '../../types'

export const BorderHorizontalOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(BorderHorizontal, {
          className: 'border-horizontal-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BorderHorizontalOutlined.displayName = 'BorderHorizontalOutlined'
