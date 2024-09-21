import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pushpin from '../../svg/outlined/pushpin.svg'
import type { IconProps } from '../../types'

export const PushpinOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Pushpin)
    return <Icon {...props} ref={ref} />
  },
)
