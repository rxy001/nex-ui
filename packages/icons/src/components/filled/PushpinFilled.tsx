import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pushpin from '../../svg/filled/pushpin.svg'
import type { IconProps } from '../../types'

export const PushpinFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Pushpin, { className: 'pushpin-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PushpinFilled.displayName = 'PushpinFilled'
