import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import More from '../../svg/outlined/more.svg'
import type { IconProps } from '../../types'

export const MoreOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(More, { className: 'more-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MoreOutlined.displayName = 'MoreOutlined'
