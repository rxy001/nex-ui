import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pushpin from '../../svg/outlined/pushpin.svg'
import type { IconProps } from '../../types'

export const PushpinOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Pushpin, { className: 'pushpin-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
