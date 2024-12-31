import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderInner from '../../svg/outlined/border-inner.svg'
import type { IconProps } from '../../types'

export const BorderInnerOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BorderInner, { className: 'border-inner-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BorderInnerOutlined.displayName = 'BorderInnerOutlined'
