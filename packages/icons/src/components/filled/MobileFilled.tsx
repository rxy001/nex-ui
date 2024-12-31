import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mobile from '../../svg/filled/mobile.svg'
import type { IconProps } from '../../types'

export const MobileFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Mobile, { className: 'mobile-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MobileFilled.displayName = 'MobileFilled'
