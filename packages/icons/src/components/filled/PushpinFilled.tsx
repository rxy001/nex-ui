import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pushpin from '../../svg/filled/pushpin.svg'
import type { IconProps } from '../../types'

export const PushpinFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Pushpin, { className: 'pushpin-filled' })
    return <Icon {...props} ref={ref} />
  },
)
