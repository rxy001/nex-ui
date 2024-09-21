import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Notification from '../../svg/filled/notification.svg'
import type { IconProps } from '../../types'

export const NotificationFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Notification)
    return <Icon {...props} ref={ref} />
  },
)
