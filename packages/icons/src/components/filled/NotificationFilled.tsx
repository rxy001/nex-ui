import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Notification from '../../svg/filled/notification.svg'
import type { IconProps } from '../../types'

export const NotificationFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Notification, { className: 'notification-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
