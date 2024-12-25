import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Notification from '../../svg/outlined/notification.svg'
import type { IconProps } from '../../types'

export const NotificationOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Notification, { className: 'notification-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
