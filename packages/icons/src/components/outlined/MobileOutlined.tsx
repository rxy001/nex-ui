import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mobile from '../../svg/outlined/mobile.svg'
import type { IconProps } from '../../types'

export const MobileOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Mobile, { className: 'mobile-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MobileOutlined.displayName = 'MobileOutlined'
