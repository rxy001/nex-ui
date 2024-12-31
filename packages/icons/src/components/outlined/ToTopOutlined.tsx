import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ToTop from '../../svg/outlined/to-top.svg'
import type { IconProps } from '../../types'

export const ToTopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ToTop, { className: 'to-top-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ToTopOutlined.displayName = 'ToTopOutlined'
